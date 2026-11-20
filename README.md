# T3 Code Theme for bb

A plugin for [bb](https://github.com/get-bb/bb) that makes bb look like
[T3 Code](https://github.com/pingdotgg/t3code): its colors, icons, fonts, type
sizes, shadows, borders, buttons, composer, menus, spacing and control motion,
in light and dark.

The bb layout stays the same: the same panels, controls and positions.

## Install

```sh
bb plugin install git:https://github.com/ahmedhesham6/bb-plugin-t3code-theme.git
bb theme set plugin:t3code-theme:t3code
```

To go back, pick a different theme and turn the plugin off:

```sh
bb theme set default
bb plugin disable t3code-theme
```

## What changes

- **Theme.** Zinc surfaces in light mode, true black in dark mode, and T3
  Code's blue for primary buttons, switches, focus rings and links.
- **Controls.** Buttons, inputs, the composer, user messages, sidebar rows,
  menus, popovers, tooltips and dialogs get T3 Code's radius, height, border
  and shadow.
- **Sidebar.** T3 Code's grain texture, with its night-sky art at the top.
- **Icons.** While the plugin is on, bb's icons change to the Lucide icons T3
  Code uses, at T3 Code's stroke width. Brand logos stay the same. The icons
  follow the plugin, not the theme.
- **Motion.** Buttons scale down a little when you press them. This stops
  when your system asks for reduced motion.

## Settings the theme copies

The theme matches T3 Code with these Appearance settings:

| T3 Code setting | Value |
| --- | --- |
| Contrast | 80% |
| Glass opacity | 100% |
| Interface font | SF Pro, 16 px |
| Monospace font | Menlo, 13 px |

To change the contrast, edit `--t3-contrast` in
[themes/t3code.css](themes/t3code.css). T3 Code's own default is 100%.

## Limits

- The theme styles bb through its CSS tokens and through rules that target
  bb's class names. A bb release that changes its markup can break a rule.
  Tested with bb 0.50.
- A bb icon added after this release keeps bb's artwork until the icon table
  in [app.tsx](app.tsx) gets an entry for it.

## Develop

```sh
npm install
npm test
npm run typecheck
npm run build        # needs the bb CLI
bb plugin install path:$PWD
```

## Credits

The style values and sidebar art come from T3 Code, Copyright (c) 2026 T3
Tools Inc., under the MIT license. The icons are [Lucide](https://lucide.dev),
under the ISC license. [LICENSE](LICENSE) has each notice. This project is not
affiliated with T3 Tools Inc.
