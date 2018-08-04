# WebpackCacheExtractCssBug
Reproduces a bug related to webpack cache-loader combination with mini-css-extract

Steps to reproduce on windows:

1. Run npm install on the root folder after downloading all the files

2. Double click on "run webpack.cmd" and let it finish

3. mini-css-extract extracted css as desired to "wwwroot\css" folder and cache-loader created cache in ".cache-loader" folder

4. Delete the extracted css file from "wwwroot\css" folder

5. Run "run webpack.cmd" again

6. This time mini-css-extract did not exctract anything to "wwwroot\css" folder

7. However if you delete the files in ".cache-loader" folder and run "run webpack.cmd" again then mini-css-extract will exctract the css file to "wwwroot\css" folder as desired

NOTE: The "wwwroot\js" folder here is auto-generated so steps will work without it too.
