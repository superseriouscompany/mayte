var adjustMaxes = {
  c: 10,
  m: 50,
  y: 30,
  k: 5,
}

var objects = app.selection;
for (i = 0; i < objects.length; i++) {
  var c = new CMYKColor()
  c.cyan = Math.round(Math.random() * adjustMaxes.c);
  c.magenta = Math.round(Math.random() * adjustMaxes.m);
  c.yellow = Math.round(Math.random() * adjustMaxes.y);
  c.black = Math.round(Math.random() * adjustMaxes.k);
  objects[i].fillColor = c
}
