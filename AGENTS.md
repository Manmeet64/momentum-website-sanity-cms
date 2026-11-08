# Momentum Studio (`studio/`)

Sanity Content Studio (v6, TypeScript, React 19) for the Momentum website. Editors manage all site copy and media here; `../website` reads it via GROQ. Sanity project ID `dsr2azhe`, studio title "Momentum Web".

## Commands

```bash
pnpm dev      # sanity dev, :3333
pnpm build    # sanity build → dist/ (git-ignored)
pnpm deploy   # sanity deploy (hosted Studio; appId in sanity.cli.ts)
```

Use pnpm (9.15.9). No tests; verify by running the Studio and checking `tsc`/eslint (`@sanity/eslint-config-studio`).

## Structure

- `sanity.config.ts` — workspace config: `structureTool({structure})`, `visionTool()`, `schema.types = schemaTypes`. Dataset = `SANITY_STUDIO_DATASET` or `development`.
- `sanity.cli.ts` — CLI/deploy config: project `dsr2azhe`, dataset `production`, hosted-Studio `appId`, `autoUpdates: true`.
- `structure.ts` — custom desk structure. Singletons are pinned list items with a fixed `documentId` equal to the type name (`hero`, `aboutSection`, `aboutPage`, `ctaSection`, `collabPage`, `siteSettings`); `vaultEvent`, `partner`, `testimonial`, `member` are normal lists.
- `schemaTypes/index.ts` — the registry. **Every new schema must be imported and added to `schemaTypes` here**, and if it's a singleton, also added to `structure.ts`.
  - `documents/` — hero, aboutSection, aboutPage, ctaSection, vaultEvent, testimonial, member, collabPage, siteSettings
  - `singletons/` — partner, heroMedia (despite the folder name, `partner` is a multi-document list in the desk; folder placement is historical)
  - `objects/` — aboutStep (reusable object)
- `.sanity/`, `dist/`, `*.tsbuildinfo` are generated and git-ignored; don't edit them.

## Schema conventions

- Use `defineType` / `defineField` from `sanity`; one file per type with a default export; `name` is camelCase and doubles as the GROQ `_type` and (for singletons) the document ID.
- Add `validation` (`Rule.required()`, `.max()`) and `description` text for editors; keep `preview` meaningful. Editors are non-technical.
- Formatting (Prettier in `package.json`): no semicolons, single quotes, no bracket spacing, 100 cols. Some existing schema files drift from this; follow Prettier for new code.

## Keeping the website in sync

The website's GROQ queries live in `../website/sanity/lib/queries.ts`. When you add, rename, or remove a field here, update the query and consuming component there in the same change, and keep the component's hardcoded fallback working when the field is empty. Renaming a field orphans existing content in the dataset — prefer adding a field and migrating, and tell the user.

## Datasets & safety

- `development` (Studio default) and `production` (CLI default; what the website uses by default) both exist. Always confirm which dataset a task targets before mutating content or deploying schema. Do not write to `production` without being asked.
- The Sanity MCP tools can query/patch documents and deploy schemas; prefer editing schemas in this local Studio and deploying from here over `schema_fields_patch`-style remote edits.
- Free-tier datasets are public and have hard caps; avoid bulk-uploading large media.
- `.env.local` (git-ignored) holds `SANITY_STUDIO_DATASET`; don't commit env files.
- CORS origins for the website's domains (including the Netlify and any Vercel URLs) must be allowed in Sanity Manage if the site ever needs credentialed access; plain public reads don't.

## Hosting note

The website is moving from Vercel to Netlify (see root `AGENTS.md`). That does not affect this package: the Studio is deployed separately with `sanity deploy`, not on either host.

## Git

Own repo (`origin` = `Manmeet64/momentum-website-sanity-cms`). Conventional commits (`feat(about): …`). Run git from this directory. `.superpowers/sdd/` holds earlier task briefs/reports from agent-driven work.
