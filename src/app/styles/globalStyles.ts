import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

html,
body {
  margin: 0;
  padding: 0;
  font-family:  Arial, Helvetica, sans-serif;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

h1,
h2,
h3 {
  margin: 0;
}

img,
svg {
  display: block;
  max-width: 100%;
  height: auto;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

p {
  margin: 0;
  font: inherit;
}

b {
  display: block;
  font: inherit;
}

i {
  font-style: normal;
}

a[href^="tel"] {
  color: inherit;
  text-decoration: none;
}

a {
  text-decoration: none;
}

button {
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none;
  text-shadow: none;
  border: 0;
}

* {
  -webkit-text-size-adjust: none;
  box-sizing: border-box;
}

input {
  padding: 10px;
  font-family: "Inter", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 160%;
  text-align: left;
  color: #000000;
  border: 1px solid #000000;
  border-radius: 10px;
}

input:focus-visible {
  outline: none;
  border-color: #2c6a66;
}
`

export default GlobalStyle;