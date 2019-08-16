import $, { Transformer, ok, error, ValidationError } from 'transform-ts'

export const $Date: Transformer<unknown, Date> = $.string.compose(
  new Transformer(
    s => {
      const d = new Date(s)
      return !isNaN(d.getTime()) ? ok(d) : error(ValidationError.from(new Error('Invalid Date')))
    },
    d => ok(d.toISOString()),
  ),
)
