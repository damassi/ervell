//
//  SafariExtensionHandler.swift
//  Are.na for Safari Extension
//
//  Created by Charles Broskoski on 1/19/20.
//  Copyright © 2020 When It Changed Inc. All rights reserved.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    override init() {
        super.init()
        SafariExtensionViewController.shared.initWebView()
    }
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        // This method will be called when a content script provided by your extension calls safari.extension.dispatchMessage("message").
        page.getPropertiesWithCompletionHandler { properties in
            NSLog("The extension received a message (\(messageName)) from a script injected into (\(String(describing: properties?.url))) with userInfo (\(userInfo ?? [:]))")
        }
    }
    
    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked")
    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }

    override func popoverWillShow(in _: SFSafariWindow) {
        SafariExtensionViewController.shared.popoverOpenCount += 1
        DispatchQueue.main.async {
            SafariExtensionViewController.shared.sendCurrentPage()
        }
    }

    override func popoverDidClose(in _: SFSafariWindow) {
        SafariExtensionViewController.shared.popoverOpenCount -= 1
    }

    func sendMessage(msg: [String: Any]?, sender: Tab? = nil) {
        if SafariExtensionViewController.shared.webView == nil {
            return
        }
        let newMsg = AppMessage()
        newMsg.command = "app_message"
        newMsg.senderTab = sender
        do {
            let jsonData = try JSONSerialization.data(withJSONObject: msg as Any, options: [])
            newMsg.data = String(data: jsonData, encoding: .utf8)
        } catch let error {
            print("error converting to json: \(error)")
        }
        SafariExtensionViewController.shared.replyMessage(message: newMsg)
    }
    
    override func contextMenuItemSelected(withCommand command: String, in page: SFSafariPage, userInfo: [String : Any]? = nil) {
        
        print(userInfo ?? "No user info")
        
        switch command {
        case "AddFromContextMenu":
            DispatchQueue.main.async {
                SafariExtensionViewController.shared.openPopover()
                    
                let data = ContextMenuData()
                
                data.type = userInfo?["type"] as? String ?? ""
                data.id = userInfo?["id"] as? String ?? ""
                data.value = userInfo?["value"] as? String ?? ""
                data.original_source_title = userInfo?["original_source_title"] as? String ?? ""
                data.original_source_url = userInfo?["original_source_url"] as? String ?? ""
                
                SafariExtensionViewController.shared.contextInfo = data
                
                return SafariExtensionViewController.shared.sendContextMenuData(contextInfo: data)
            }
            
        default:
            NSLog("No command found")
        }
    }
}
