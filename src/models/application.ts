import * as $ from 'transform-ts'

export interface Application
  extends Readonly<{
    id: number
    name: string
    isAutomated: boolean
  }> {}

export const $Application: $.Transformer<unknown, Application> = $.obj({
  id: $.number,
  name: $.string,
  isAutomated: $.optional($.boolean).compose(new $.Transformer(b => $.ok(b !== undefined ? b : false), $.ok)),
})
