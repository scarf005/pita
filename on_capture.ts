// deno-lint-ignore no-unused-vars
import type { match } from "npm:ts-pattern@5.0.5"
import { RegExCaptureResult, TypedRegEx } from "./typed_regex.ts"

/**
 * Call given function with with capture groups if the {@link regex} matches.
 *
 * @returns argument list for @see {@link match}.when
 */
export const onCapture = <const T extends string>(regex: T) => {
	const parser = TypedRegEx(regex)
	return (f: (str: RegExCaptureResult<T>) => unknown) =>
		// deno-lint-ignore no-explicit-any
		[parser.isMatch, (str: string) => f(parser.captures(str)! as any) as unknown] as const
}
