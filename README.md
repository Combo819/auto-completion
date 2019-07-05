# Auto-Completion Input Box

This is a auto completion React code. Based on React and BootStrap.  
[Preview](https://combo819.github.io/auto-completion/)


## features
### 1. auto completion
When you type in some words in the input box, some suggestion options will show up. You can either press Enter or click on the suggestion options to select select content. Do not type in a all-space string. Space at the start and end will be removed.

### 2. Tags
Once you hit Enter or click on the suggestion option, a new tag is generated. You can click on the cross in the tag to delete this tag. If there are too many tags, some tags will be put into the "more" dropdown to avoid overflow.

### 3. Description
There are three different types of elements in the right of the suggestion options. First type is a number input box, you can choose a number from 10 to 100. The second type is a string input box. Then the third one is a random string. If click on the submit button, the information will show up in the table. The description is "null" if you directly press Enter or didn't type anything in the suggestion option input box.

### 4. Table
Click on submit button and all the tags' information will be shown in the following table.


## Bugs
### 1. CSS for submit button
When adding tags, sometimes the submit button will go down to the next row.
### 2. Other
other CSS problems occur not usually.

## Future Improvement
### 1. Tooltip
If a very long string is typed in, some part of the suggestion will exceed the box. So I hide the overflowing part. I will try to add a tooltip for the long suggestion options, which appears when the mouse hovers over the option.


## Thoughts
### 1. Tags in the Input Box
Putting a element into a input element is not allowed. So, I wrap a div outside the input element, and add tags as the silibings elements. Using some CSS tricks, the tags float upon the input box, which make it looks like inside the input box.

### 2. Tags Overflow
Everytime a tag added or removed, the function `getTagsWidth` will calculate the number of tags and the length of all strings. Then it decides a tag shown or hidden. If the tags are long enough, some tags are hidden. If a shown tag is removed, the first hidden tag will be shown.

### 3. Suggestion Options over Table
the container of input box and the relevant elements are set to absolute positon, which makes the suggestion options float over the table, rather than pushes the table whenever the suggestion options show up.

### 4. Suggestion Options Source
The function `generateSource` generate some random strings as well as `[value,value+value,value+value+value]`, so that there are always at least three suggestion options.
