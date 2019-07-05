# Auto-Completion Input Box

This is an auto-completion React code. Based on React and BootStrap.  
[Preview](https://combo819.github.io/auto-completion/)


## features
### 1. autocompletion
When you type in some words in the input box, some suggestion options will show up. You can either press Enter or click on the suggested options to select content. Do not type in an all-space string. Space at the start and end will be removed.

### 2. Tags
Once you hit Enter or click on the suggestion option, a new tag is generated. You can click on the cross in the tag to delete this tag. If there are too many tags, some tags will be put into the "more" dropdown to avoid overflow.

### 3. Description
There are three different types of elements in the right of the suggestion options. The first type is a number input box, you can choose a number from 10 to 100. The second type is a string input box. Then the third one is a random string. If I click on the submit button, the information will show up in the table. The description is "null" if you directly press Enter or didn't type anything in the suggestion option input box.

### 4. Table
Click on submit button and all the tags' information will be shown in the following table.


## Bugs
### 1. CSS for submit button
When adding tags, sometimes the submit button will go down to the next row.

### 2. Length of Tags
I estimate the whole length of all tags using a formula `totalTags * 60 + totalString.length * 16` rather than get the DOM width attribute. Somethings the hidden tags will not show up though there is enough space after remove a tag. The `60` is an empirical number and `16` is the font size.

## Future Improvement
### 1. Tooltip
If a very long string is typed in, some part of the suggestion will exceed the box. So I hide the overflowing part. I will try to add a tooltip for the long suggestion options, which appears when the mouse hovers over the option.

### 2. simplify Code
Some of the code can be simplified but the project has taken too much time.


## Thoughts
### 1. Tags in the Input Box
Putting an element into an input element is not allowed. So, I wrap a div outside the input element and add tags as the sibling elements. Using some CSS tricks, the tags float upon the input box, which makes it looks like inside the input box.

### 2. Tags Overflow
Every time a tag added or removed, the function `getTagsWidth` will calculate the number of tags and the length of all strings. Then it decides a tag shown or hidden. If the tags are long enough, some tags are hidden. If a tag is removed, the other hidden tags' `fold` property will be rechecked to determine it should be shown or hidden.

### 3. Suggestion Options over Table
the container of the input box and the relevant elements are set to absolute position, which makes the suggestion options float over the table, rather than pushes the table whenever the suggestion options show up.

### 4. Suggestion Options Source
The function `generateSource` generate some random strings as well as `[value,value+value,value+value+value]`, so that there are always at least three suggestion options.


## Other comments
### 1. CSS
The CSS is a little bit boring and tiring. I spend much time adjusting the CSS. Although I use Bootstrap as the UI Library, I still need to customize some of the styles to implement some layouts like tags in the input box and input box's padding

### 2. Size
The webpage is not responsive. A larger screen is recommended.

### 3. Other Library
+ [Auto-completion in Antd](https://ant.design/components/auto-complete/)
+ [input number in Antd](https://ant.design/components/input-number/)
+ [select in antd](https://ant.design/components/select/#components-select-demo-select-users) However, I prefer to build up these components from scratch as this is a practice.
+ [Bootstrap React](https://react-bootstrap.github.io/getting-started/introduction) After I began programming, I noticed there is a Libray: Bootstrap for React. I didn't want to re-write my code, so I didn't adopt this library.
