# Translations

Status of the app's translations as of 19 October 2026.

Each language is one JSON file in [`src/i18n/translations/`](src/i18n/translations/), named by its language code. English ([`en.json`](src/i18n/translations/en.json)) is the reference: every other file should have the same keys. Any key that is missing falls back to English.

## Summary

- There are **30 translation files**, but the app **loads only 10** of them (see [`src/i18n/config.ts`](src/i18n/config.ts)). The other 20 have no effect until they are loaded.
- **English is the only complete translation.** No other language has the `landing` keys (the start page), so the start page always shows English.
- Six loaded languages have no **lead-in sentences** for the result card ("I have the following food allergies:"). Their card shows the group's title instead, for example "食物アレルギー".
- On 19 October 2026 the ten files in the older key layout were brought up to date, and wrong "vegan" and "vegetarian" terms were fixed in five of them (see [Fixed errors](#fixed-errors)). The new text in those files was written without a native speaker and needs review.

## Status by language

| Language | Code | Live | Notes | Confidence | Verified by human |
| --- | --- | --- | --- | --- | --- |
| English | `en` | Yes | Complete | n/a | n/a (source text) |
| Spanish | `es` | Yes | Missing start page | High | No |
| French | `fr` | Yes | Missing start page | High | No |
| Portuguese | `pt` | Yes | Missing start page | High | No |
| German | `de` | Yes | Missing start page and card lead-ins | High | No |
| Italian | `it` | Yes | Missing start page and card lead-ins | High | No |
| Russian | `ru` | No | Missing start page and card lead-ins | Medium | No |
| Chinese (simplified) | `zh` | No | Missing start page and card lead-ins | Medium | No |
| Japanese | `ja` | No | Missing start page and card lead-ins | Medium | No |
| Korean | `ko` | No | Missing start page and card lead-ins | Medium | No |
| Czech | `cs` | No | Ready apart from start page | Medium | No |
| Danish | `da` | No | Ready apart from start page | High | No |
| Dutch | `nl` | No | Ready apart from start page | High | No |
| Finnish | `fi` | No | Ready apart from start page | High | No |
| Greek | `el` | No | Ready apart from start page | Medium | No |
| Hungarian | `hu` | No | Ready apart from start page | Medium | No |
| Norwegian | `no` | No | Ready apart from start page | High | No |
| Polish | `pl` | No | Ready apart from start page | Medium | No |
| Swedish | `sv` | No | Ready apart from start page | High | No |
| Turkish | `tr` | No | Ready apart from start page | Medium | No |
| Ukrainian | `uk` | No | Ready apart from start page. Offered on the result page, but shows English | Medium | No |
| Bengali | `bn` | No | Ready apart from start page | Low | No |
| Hindi | `hi` | No | Ready apart from start page | Low | No |
| Punjabi | `pa` | No | Ready apart from start page | Low | No |
| Pashto | `ps` | No | Ready apart from start page | Low | No |
| Tamil | `ta` | No | Ready apart from start page | Medium | No |
| Telugu | `te` | No | Ready apart from start page | Low | No |
| Urdu | `ur` | No | Ready apart from start page | Medium | No |
| Cantonese | `yue` | No | Ready apart from start page | Medium | No |
| Chinese (traditional) | `zh-Hant` | No | Ready apart from start page | Medium | No |

### What the columns mean

- **Live:** "Yes" if the app loads the language in `config.ts` and offers it in the language lists. "No" means the file exists but the app doesn't use it.
- **Missing start page:** has no `landing` keys (10 keys: the start page's headline, intro, button, and the dark and light mode labels).
- **Missing card lead-ins:** has no `header` key under `dietary.preferences`, `dietary.intolerances` or `dietary.allergies`. These are the sentences shown above each group on the result card.
- **Ready apart from start page:** has every key English has except the `landing` keys.

**Confidence** is an estimate of how trustworthy the text is. It comes from a read-through of the files, not from a native speaker:

- **High:** widely used terms that read correctly; no problems found.
- **Medium:** mostly right, but some terms are unusual or awkward. For example, Japanese uses 完全菜食 for "vegan" where ヴィーガン is more common, and Czech uses adjective forms ("Veganské") that read oddly on their own.
- **Low:** the file had a safety error (see [Fixed errors](#fixed-errors)), and its newer text was written without a native speaker.

**Verified by human** is "Yes" only once a native speaker has checked the whole file. No file has been checked yet. When one is, change its row and note who checked it and when.

## Adding a language to the app

1. Make sure its file has the same keys as `en.json`.
2. Import it in [`src/i18n/config.ts`](src/i18n/config.ts) and add it to `resources`.
3. Add it to the `languages` list in both [`LanguageSelector.tsx`](src/components/LanguageSelector.tsx) and [`TranslationResult.tsx`](src/components/TranslationResult.tsx).
4. Add a flag for it in [`src/assets/flags/`](src/assets/flags/) if one doesn't exist.
