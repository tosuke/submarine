import { Transformer, ValidationResult, ok } from 'transform-ts'

export const withResult = <A, B>(f: Transformer<A, B>): Transformer<A, ValidationResult<B>> =>
  Transformer.from(input => ok(f.transform(input)))
