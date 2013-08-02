argonaut
========

I got bored of having to make predictable changes to package.json, composer.json and smart.json files (amongst other things), and i couldn't find any command line things that did this in an easy way.

NB - this is still in development, so the API is subject to change

# Instalation

    npm install -g argonaut

# Usage

    argonaut -f path/to/file.json key value [other key value pairs]

The file path can be relative or absolute

The key is a . (dot) delimited path to the value. The following command

    argonaut -f test.json staff.uk.count 4

would produce:

    {
      "staff": {
        "uk": {
          "count": 4
        }
      }
    }


# Development

Still to do:

- array/append mode (append value to key, rather than assign)
- increment mode (increment existing by value)
- semver mode (modify semver at key by value)
