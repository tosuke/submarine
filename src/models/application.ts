import $, { Transformer, ok } from 'transform-ts'

export class Application {
  constructor(readonly id: number, readonly name: string, readonly isAutomated: boolean) {}
}

export const $Application: Transformer<unknown, Application> = $.obj({
  id: $.number,
  name: $.string,
  isAutomated: $.optional($.boolean).compose(new Transformer(b => ok(b !== undefined ? b : false), ok)),
}).compose(new Transformer(({ id, name, isAutomated }) => ok(new Application(id, name, isAutomated)), ok))
