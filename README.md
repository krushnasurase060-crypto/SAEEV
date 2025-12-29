How to add `ev.png` to this site

This folder is for image assets. To add your real `ev.png` image, copy it here. If you want a quick placeholder PNG, you can create a 1x1 transparent PNG from the base64 below.

Base64 (1×1 transparent PNG):

iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=

PowerShell command (run from project root) to create `images\ev.png`:

```powershell
[System.IO.File]::WriteAllBytes("images\\ev.png", [System.Convert]::FromBase64String("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="))
```

HTML example to reference the image (place in your page):

```html
<img src="images/ev.png" alt="EV image">
```
