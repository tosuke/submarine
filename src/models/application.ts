import $, { Transformer, ok } from 'transform-ts'

export class Application {
  constructor(readonly id: number, readonly name: string, readonly isAutomated: boolean) {}
}

export const $Application: Transformer<unknown, Application> = $.obj({
  id: $.number,
  name: $.string,
  isAutomated: $.optional($.boolean).compose(Transformer.from(b => ok(b !== undefined ? b : false))),
}).compose(Transformer.from(({ id, name, isAutomated }) => ok(new Application(id, name, isAutomated))))
