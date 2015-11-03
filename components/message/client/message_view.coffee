Backbone = require "backbone"
Backbone.$ = $
sd = require("sharify").data
Cookies = require 'cookies-js'
mediator = require '../../../lib/mediator.coffee'

template = -> require("../templates/announcement.jade") arguments...

module.exports = class MessageView extends Backbone.View

  events:
    'click .message__inner__close' : 'remove'

  initialize: ({ @container })->
    super
    console.log 'initialize'
    # only render if user does not have cookie
    @render() unless Cookies.get(@model.id) or $('body').hasClass 'is-mobile'

  render: ->
    console.log 'rendering'
    html = template message: @model
    @$el = $(html)
    @delegateEvents()
    @container.append @$el

    return @$el

  remove: ->
    # # user gets the message
    Cookies.set @model.id, true
    super
