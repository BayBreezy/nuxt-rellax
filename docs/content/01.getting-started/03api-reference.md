---
title: API Reference
description: Complete reference for all nuxt-rellax types, options, and return values.
navigation:
  icon: lucide:book-open
---

## ModuleOptions

Configured under the `rellax` key in `nuxt.config.ts`.

:::prose-field-group{variant="all"}
::prose-field{name="defaults" type="Partial<RellaxOptions>" default-value="{}"}
Default Rellax options merged into every instance. Per-instance options override these.
::
::prose-field{name="disableBelow" type="number" default-value="0"}
Viewport width in pixels. Parallax is disabled when `window.innerWidth` is below this value. `0` means never disable. Instances are restored when the viewport grows past the threshold again.
::
::prose-field{name="respectReducedMotion" type="boolean" default-value="true"}
Skip parallax initialization when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is `true`.
::
:::

---

## RellaxOptions

Options from the underlying [Rellax.js](https://github.com/dixonandmoe/rellax) library. These can be used anywhere an options object is accepted.

:::prose-field-group{variant="all"}
::prose-field{name="speed" type="number" default-value="-2"}
Parallax speed. Range: `-10` to `10`. Negative values scroll the element upward; positive values scroll it downward relative to the page.
::
::prose-field{name="center" type="boolean" default-value="false"}
Center the parallax on the element's natural position. The element starts at rest and offsets symmetrically as the user scrolls toward and away from it.
::
::prose-field{name="wrapper" type="string | null" default-value="null"}
CSS selector for a custom scrollable container. When set, Rellax tracks the scroll position of this element instead of the window.
::
::prose-field{name="relativeToWrapper" type="boolean" default-value="false"}
Compute the parallax offset relative to the `wrapper` element. Requires `wrapper` to be set.
::
::prose-field{name="round" type="boolean" default-value="true"}
Round transform values to the nearest pixel. Reduces sub-pixel rendering artifacts on non-retina screens.
::
::prose-field{name="vertical" type="boolean" default-value="true"}
Apply the parallax effect on the vertical (Y) axis.
::
::prose-field{name="horizontal" type="boolean" default-value="false"}
Apply the parallax effect on the horizontal (X) axis.
::
::prose-field{name="zindex" type="number" default-value="0"}
CSS `z-index` to apply to the element during scroll. Useful for layering elements.
::
::prose-field{name="breakpoints" type="[number, number, number]" default-value="[576, 768, 1201]"}
Responsive breakpoints. Rellax reads `data-rellax-speed-xs`, `data-rellax-speed-sm`, `data-rellax-speed-md`, and `data-rellax-speed-lg` attributes at these widths.
::
:::

---

## UseRellaxOptions

Extends `RellaxOptions` with additional options for the `useRellax` composable and `<RellaxElement>`.

:::prose-field-group{variant="all"}
::prose-field{name="observeIntersection" type="boolean" default-value="false"}
Use an `IntersectionObserver` to lazy-initialize the Rellax instance. The instance is created when the element enters the viewport and destroyed when it leaves. Requires an `Element` or `Ref<HTMLElement>` target — does not work with CSS selector strings.
::
::prose-field{name="intersectionThreshold" type="number" default-value="0"}
The fraction of the element that must be visible before the `IntersectionObserver` callback fires. Value between `0` and `1`.
::
::prose-field{name="intersectionRootMargin" type="string" default-value="0px"}
Margin around the viewport root used by the `IntersectionObserver`. Positive values extend the detection area beyond the viewport (e.g. `"100px"` pre-loads parallax before the element scrolls into view).
::
:::

---

## RellaxReturn

The object returned by `useRellax` and exposed by `<RellaxElement>`.

:::prose-field-group{variant="all"}
::prose-field{name="instance" type="Ref<RellaxInstance | null>"}
The raw Rellax instance. `null` on the server and before the component mounts. Reading `.value` gives you direct access to Rellax's own methods if needed.
::
::prose-field{name="refresh" type="() => void"}
Calls `instance.refresh()`. Recomputes the scroll position and transforms without destroying the instance. Use after a DOM layout change (e.g., after images load, an accordion opens, or a modal appears).
::
::prose-field{name="destroy" type="() => void"}
Calls `instance.destroy()` and sets `instance.value` to `null`. The element returns to its natural CSS position.
::
::prose-field{name="reinitialize" type="() => void"}
Destroys the current instance and creates a new one. If options were provided as a getter function, the getter is called again so the new instance uses the latest values.
::
:::

---

## v-rellax Directive

### Modifiers

| Modifier | Equivalent Option |
|---|---|
| `v-rellax.center` | `{ center: true }` |
| `v-rellax.horizontal` | `{ horizontal: true }` |

Modifiers can be combined with a binding value. The binding value takes precedence if the same option is set in both:

```vue
<!-- center: true from modifier, speed: -3 from value -->
<div v-rellax.center="{ speed: -3 }">...</div>
```

### Lifecycle

| Hook | Action |
|---|---|
| `mounted` | Creates a `Rellax` instance with merged module defaults + binding value |
| `updated` | Calls `instance.refresh()` |
| `unmounted` | Calls `instance.destroy()` |

---

## Data Attributes

Rellax.js also reads configuration from `data-rellax-*` HTML attributes. These work alongside the directive and composable.

| Attribute | Equivalent Option |
|---|---|
| `data-rellax-speed` | `speed` |
| `data-rellax-zindex` | `zindex` |
| `data-rellax-percentage` | Position percentage for centering |
| `data-rellax-speed-xs` | Speed at the `xs` breakpoint |
| `data-rellax-speed-sm` | Speed at the `sm` breakpoint |
| `data-rellax-speed-md` | Speed at the `md` breakpoint |
| `data-rellax-speed-lg` | Speed at the `lg` breakpoint |

```vue
<!-- Responsive speed via data attributes -->
<div
  v-rellax
  data-rellax-speed="-2"
  data-rellax-speed-xs="0"
  data-rellax-speed-sm="-1"
>
  Responsive parallax
</div>
```

::prose-callout{variant="tip" title="CSS class selector + data attributes"}
When using `useRellax('.my-class')` with a class selector, per-element speeds are best set via `data-rellax-speed` on each element rather than as a shared options value.
::

---

## $rellax Inject

The module injects the Rellax constructor into your Vue app as `$rellax`. This is useful for creating instances outside of the directive or composable API.

```ts
const { $rellax } = useNuxtApp()
const instance = new $rellax('.my-element', { speed: -3 })
```

::prose-callout{variant="warning" title="Manual lifecycle management"}
Instances created via `$rellax` are not automatically destroyed. You are responsible for calling `instance.destroy()` when the component unmounts.
::
