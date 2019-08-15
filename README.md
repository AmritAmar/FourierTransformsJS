# FourierTransformsJS
An exploration of Fourier Transforms using p5.js

This was a project I made after starting to learn javascript using [p5.js](https://p5js.org/). I really like the idea of how code can be used to visualize abstract math concepts (and show what exactly is happening in the background) and I hope to continue making more visualizations using code in the future. First a few references: I got interested in fourier transforms after watching [3Blue1Brown's video on the topic](https://www.youtube.com/watch?v=spUNpyF58BY). I also saw this really [cool and interactive introduction](http://www.jezzamon.com/fourier/index.html) to the topic by [@jezzamonn](https://twitter.com/jezzamonn). Finally, I learnt javascript (and most of this project) by watching [Daniel Shiffman's Coding Challenges](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw)!

What is a fourier transform? It's simply a way of breaking apart a wave into individual components. This is most used in signal processing, specifically in the audio area. One of the coolest things you can do with fourier transforms is extract specific sounds and tune them however you like! So for example, if you had a music clip with a bit of fuzzy noise in the background, you can use a fourier transform on the clip and get the individual sound waves. After finding the one causing the fuzzy noise, you can remove it. Combine the remaining waves and voila - you have a sound clip without that fuzzy sound.

Following Daniel Shiffman's tutorial, I first started with visualizing the [fourier series](https://en.wikipedia.org/wiki/Fourier_series). I visualized the square wave and the sawtooth wave. This is in the Fourier Series Folder, demo here: https://editor.p5js.org/AmritAmar/present/SnFt_PCfq

Signals, or waves, can be interpreted as a set of points. One for the X axis, and one for the Y axis. If we apply the fourier transform to both of them, we can 2 transforms that give us the frequence, phase, and amplitude of each component. This is what I did in the next iteration, in the Fourier Series Circle Folder, demo here: https://editor.p5js.org/AmritAmar/present/agLRZQ7Wm

I then, instead of simply drawing a circle from a set of points, implemented the ability to create the signal/drawing yourself! Once you finish drawing, the program does a fourier transform, breaking your drawing into X and Y components. Try it out - click and draw something - https://editor.p5js.org/AmritAmar/present/wCIhlz7Yv

The final part of this project involved combining the 2 parts, X and Y components, into 1 Complex Number component. This allows you to use only one overall circle to draw both parts of the transform as the complex number component captures both X and Y of the drawing. Try the final version out - https://editor.p5js.org/AmritAmar/present/YjvB9MTas

In addition:

- use A/D to reduce/increase the number of epicycles used

- use W/S to increase/reduce the speed 

... and see how it affects the fourier transform!
