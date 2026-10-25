import type { Directive } from "vue";

/**
 * v-reveal: Element blendet beim Hineinscrollen sanft ein.
 * Ohne IntersectionObserver (sehr alte Browser) ist es sofort sichtbar.
 * Die Animation selbst steckt in style.css (.reveal / .is-visible).
 */

const observer =
  typeof IntersectionObserver === "undefined"
    ? null
    : new IntersectionObserver(
        (entries, current) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              current.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );

export const vReveal: Directive<HTMLElement> = {
  mounted(element) {
    element.classList.add("reveal");

    if (observer) {
      observer.observe(element);
    } else {
      element.classList.add("is-visible");
    }
  },

  unmounted(element) {
    observer?.unobserve(element);
  },
};
