DESERT ROSE
====
<small>As in tumble rose - a front end for your tublr profile.</small>

A simple<sup><a href="#anchor-1">**1**</a></sup> web portfolio for your picture gallery. Uses csv files for a database.

to run:
`./gradlew build && ./gradlew run`
This will require jdk, npm and nodejs installed on your system. _You can get gradle to install those for you if you
tinker with build.gradle npm section_

Built application will produce a standalone jar: `build/libs/desert-rose-1.0-SNAPSHOT.jar`

You may present
following <a href="https://github.com/codergoblin/desert-rose/blob/master/src/main/kotlin/codergoblin/desertrose/DRConfig.kt">
optional arguments</a>:

| argument           | example                                                                                                         | default value                                    |
|--------------------|-----------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| port               | --port=80                                                                                                       | 8080                                             |
| csvReloadFrequency | --csvReloadFrequency=PT20S                                                                                      | PT1M                                             |
| categoryLocation   | --categoryLocation=https://raw.githubusercontent.com/codergoblin/desert-rose/master/test-samples/categories.csv | file://<projectPath>/test-samples/categories.csv |
| postLocation       | --postLocation=https://raw.githubusercontent.com/codergoblin/desert-rose/master/test-samples/posts.csv          | file://<projectPath>/test-samples/posts.csv      |

fore example `java -jar desert-rose-1.0-SNAPSHOT.jar --port=42069`

<span id="anchor-1">**1**</span> _you may fit
the <a href="https://github.com/codergoblin/desert-rose/blob/master/src/main/kotlin/codergoblin/desertrose/Main.kt">
server implementation</a> on a mobile screen_