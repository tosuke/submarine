import $, { Transformer, ok, error, ValidationError } from 'transform-ts'

export const $Date: Transformer<unknown, Date> = $.string.compose(
  Transformer.from(s => {
    const d = new Date(s)
    return !isNaN(d.getTime()) ? ok(d) : error(ValidationError.from(new Error('Invalid Date')))
  }),
)
