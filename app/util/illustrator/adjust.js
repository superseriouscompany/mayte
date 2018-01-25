var adjustRanges = {
  red:{min:-40, max:40},
  green:{min:-40, max:40},
  blue:{min:-40, max:40}
};

objects = app.selection;
for (i=0; i<objects.length; i++)
{
  color = objects[i].fillColor;
  if (color instanceof RGBColor)
  {
    r = color.red+adjustRanges.red.min+Math.random()*(adjustRanges.red.max-adjustRanges.red.min);
    if (r < 0) r = 0; if (r > 255) r = 255;

    g = color.green+adjustRanges.green.min+Math.random()*(adjustRanges.green.max-adjustRanges.green.min);
    if (g < 0) g = 0; if (g > 255) g = 255;

    b = color.blue+adjustRanges.blue.min+Math.random()*(adjustRanges.blue.max-adjustRanges.blue.min);
    if (b < 0) b = 0; if (b > 255) b = 255;

    c = new RGBColor();
    c.red = r; c.green = g; c.blue = b;

    objects[i].fillColor = c;
  }
}