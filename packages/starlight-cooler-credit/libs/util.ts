import starlightConfig from "virtual:starlight/user-config";
import type { StarlightCoolerCreditConfig } from "./config";
import { getLangFromLocale, type Locale } from "./i18n";

export default function getCreditText(
    config: StarlightCoolerCreditConfig,
    type: "title" | "href" | "description",
    translate: (key: any) => string,
    locale: Locale
): string | undefined {
    if (typeof config.credit === "string") {
        if (type == "href") {
            if (config.credit === "Astro") {
                return "https://docs.astro.build/";
            } else if (config.credit === "Starlight") {
                return "https://starlight.astro.build/";
            }
        }
        if (type == "title" && config.credit === "Starlight") {
            return translate(`builtWithStarlight.label`);
        }
        return translate(`starlightCoolerCredit.${config.credit.toLowerCase()}.${type}`);
    } else {
        if (type === "href") return config.credit.href;
        if (type === "description" && (!config.credit.description || config.credit.description === "")) return undefined;
        if (typeof config.credit[type] === "string") return config.credit[type];

        let text: string;
        const lang = getLangFromLocale(locale);

        if (config.credit[type][lang]) {
            text = config.credit[type][lang];
        } else {
            const defaultLang = starlightConfig.defaultLocale.lang ?? starlightConfig.defaultLocale.locale;
            text = defaultLang ? config.credit[type][defaultLang] ?? "" : "";
        }

        if (text.length === 0) {
            throw new Error("The blog title must have a key for the default language.");
        }

        return text;
    }
}