# Miranda-js

A jquery plugin for easy integration between JSON and HTML. Maintaining harmony and peace between interface programmers and server programmers when using REST services.

- jQuery support: 1.7+

For **credits and examples**, see:
http://www.fabianomiranda.com.br/miranda-js/

For **downloads**, see:
http://www.fabianomiranda.com.br/miranda-js/miranda-js.zip

## Documentation

```
The attribute name of the list or object must be the name of the key in its HTML code between [[]].

Example:
{KEY:"Miranda-JS"}
<h1>[[KEY]]</h1>
```

### Simple Array or Object integration

```
<div id="box">
    <h1>[[name]]</h1>
    <h2>[[lastname]]</h2>
</div>
<script>
var list = {"name": "Fabiano", "lastname": "Miranda"};
$("#box").mirandajs(list);
</script>
```

### Simple Object list integration

```
<div id="box">
    <h1>[[name]]</h1>
    <h2>[[lastname]]</h2>
</div>
<script>
var list = [{"name": "Fabiano", "lastname": "Miranda"},{"name": "Kaio", "lastname": "Silva"}];
$("#box").mirandajs(list);
</script>
```


### Credits

- Concept and development by [Fabiano Miranda](http://www.fabianomiranda.com.br).
