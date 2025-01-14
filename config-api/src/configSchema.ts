import { z } from 'zod';
import { withGetType } from 'zod-to-ts';

// Helper utility to make the RegExp type work with zod-to-ts
// See https://github.com/sachinraja/zod-to-ts/issues/7
const NativeUrlSchema = withGetType(
  z.instanceof(URL),
  (ts) => ts.factory.createIdentifier('URL'),
)

const RegexpSchema = withGetType(
  z.instanceof(RegExp),
  (ts) => ts.factory.createIdentifier('RegExp'),
)

// ===== Process & URL Options =====
const ProcessInfoSchema = z.object({
  name: z.string(),
  bundleID: z.string(),
  path: z.string(),
});

const OpenUrlOptionsSchema = z.object({
  pid: z.number(),    
  opener: ProcessInfoSchema.optional(),
});

export type ProcessInfo = z.infer<typeof ProcessInfoSchema>;
export type OpenUrlOptions = z.infer<typeof OpenUrlOptionsSchema>;

// ===== URL Schemas =====

const UrlTransformFnSchema = z
  .function()
  .args(NativeUrlSchema, OpenUrlOptionsSchema)
  .returns(z.union([z.string(), NativeUrlSchema]));

const UrlPatternSchema = z.union([
  z.string(), 
  RegexpSchema, 
  UrlTransformFnSchema
]);

export type UrlPattern = z.infer<typeof UrlPatternSchema>;
export type UrlTransformFn = z.infer<typeof UrlTransformFnSchema>;

// ===== Matcher Schemas =====
const MatcherFnSchema = z
  .function()
  .args(NativeUrlSchema, OpenUrlOptionsSchema)
  .returns(z.boolean());

const UrlMatcherSchema = z.union([
  z.string(),
  RegexpSchema,
  MatcherFnSchema,
]);

const UrlMatcherPatternSchema = z.union([
  UrlMatcherSchema, 
  z.array(UrlMatcherSchema)
]);

export type MatcherFn = z.infer<typeof MatcherFnSchema>;
export type UrlMatcher = z.infer<typeof UrlMatcherSchema>;
export type UrlMatcherPattern = z.infer<typeof UrlMatcherPatternSchema>;

// ===== Browser Schemas =====

const appTypes = ['name', 'bundleID', 'path', 'none'] as const;

const BrowserConfigSchema = z.object({
  name: z.string(),
  appType: z.enum(appTypes).optional(),
  openInBackground: z.boolean().optional(),
  profile: z.string().optional(),
  args: z.array(z.string()).optional(),
});

const BrowserConfigStrictSchema = BrowserConfigSchema.extend({
  appType: z.enum(appTypes),
  openInBackground: z.boolean(),
  profile: z.string(),
  args: z.array(z.string()),
  url: z.string(),
});

export type BrowserConfigStrict = z.infer<typeof BrowserConfigStrictSchema>;



const BrowserResolverFnSchema = z
  .function()
  .args(NativeUrlSchema, OpenUrlOptionsSchema)
  .returns(z.union([
    z.string(),
    BrowserConfigSchema
  ]));

const BrowserPatternSchema = z.union([
  z.string(),
  BrowserConfigSchema,
  BrowserResolverFnSchema
]);

export type BrowserConfig = z.infer<typeof BrowserConfigSchema>;
export type BrowserResolverFn = z.infer<typeof BrowserResolverFnSchema>;
export type BrowserPattern = z.infer<typeof BrowserPatternSchema>;

// ===== Rule Schemas =====
const RewriteRuleSchema = z.object({
  match: UrlMatcherPatternSchema,
  url: UrlPatternSchema,
});

const HandlerRuleSchema = z.object({
  match: UrlMatcherPatternSchema,
  browser: BrowserPatternSchema,
});

export type RewriteRule = z.infer<typeof RewriteRuleSchema>;
export type HandlerRule = z.infer<typeof HandlerRuleSchema>;

// ===== Configuration Schemas =====
const ConfigOptionsSchema = z.object({
  urlShorteners: z.array(z.string()).optional(),
  logRequests: z.boolean().optional(),
}).optional();

/**
 * @internal - don't export this schema as a type
 */
export const ConfigSchema = z.object({  
  defaultBrowser: z.string(),
  options: ConfigOptionsSchema,
  rewrite: z.array(RewriteRuleSchema).optional(),
  handlers: z.array(HandlerRuleSchema).optional(),
});

const SimpleConfigSchema = z.record(z.string(), z.string());

export type ConfigOptions = z.infer<typeof ConfigOptionsSchema>;
export type Config = z.infer<typeof ConfigSchema>;
export type SimpleConfig = z.infer<typeof SimpleConfigSchema>;

