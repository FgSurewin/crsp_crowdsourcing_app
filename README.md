# Doorfront

[![test](https://img.shields.io/github/followers/FgSurewin?label=Follow%20me&style=social)](https://github.com/FgSurewin) ![herouku](https://img.shields.io/badge/%E2%86%91%20Deploy%20to-Heroku-purple) ![license](https://img.shields.io/badge/license-MIT-green) ![node](https://img.shields.io/badge/Node-%3E%3D14.0.0-blue)

<center><img src="https://cdn.jsdelivr.net/gh/FgSurewin/pictures/imgGroup%202.svg" alt="doorFront" /></center>

<center><strong>😃Crowdsourcing Web App Based on React<strong></center>

:new:Doorfront is an out-of-the-box crowdsourcing web application that provides you a easy approach to collect your own label data. With this tool, you can simply set up your personal crowdsourcing app by​ :zap: few lines of code.

---

# Background

Based on a report by NYC MOPD, there are almost 1 million New Yorkers who have self-disclosed living with a disability or roughly 11.2% of the city’s population. MOPD also estimates that approximately 6.8 million visitors to our city each year have a disability. We propose a solution to create a large-scale open-source semantic map layer of NYC sidewalks and storefronts using a hybrid approach of machine learning and crowdsourcing, with close community engagement. In this project, we focus on developing a crowdsourcing web application that enables online crowd-workers as well as volunteers to remotely help label image data

# Features

:memo:This is an integrated version, which means it has both a sign-up/login pages and landing page. If you prefer to customizing your own landing page as well as other pages, you can just install our label tool :fire: which has been separated from the project and released by NPM (You can get more [info](#Built with package) below).

- [x] Landing page
- [x] Sign-up & Login
- [x] Built in Google Streetview
- [x] Integrated MongoDB database
- [ ] Fully support TypeScript
- [ ] Integrated other databases

## Features of Label Tool

:apple: The entire component was developed based on [Konva.js](https://konvajs.org/). We use canvas to accomplish the bounding boxes' transformations.

- [x] Zoom in and out of images
- [x] Resize bounding box
- [x] Transfer bounding box
- [x] Custom context menu
- [x] Integrated manipulation panel
- [x] Support object' s subtype

# Demo

##### Live Experience🌈: Click it [here](https://crsp-crowdsourcing-app.herokuapp.com/)

##### :stuck_out_tongue_winking_eye: Built-in Google Streetview

![](https://cdn.jsdelivr.net/gh/FgSurewin/pictures/img20210727145940.png)

##### :heart_eyes: Label Tool

![](https://cdn.jsdelivr.net/gh/FgSurewin/pictures/img20210727150046.png)

# Install

:hear_no_evil:You can clone this repo or download the ZIP file.

```bash
$ git clone https://github.com/FgSurewin/crsp_crowdsourcing_app.git
```

# Usage

:construction_worker:Since this project was developed based on Node, you should install all the third party packages before you run this project. Please make sure you download Node.js on your machine.

```bash
# In the root directory
$ npm install

# Go to /app directory
$ cd app

# In the /app directory
$ npm install
```

To enable Google Streetview and MongoDB, you have to provide two API keys and store them as environment variables because of the security problem. (More info about [Google key](https://developers.google.com/maps/documentation/javascript/get-api-key) and [MongoDB](https://www.mongodb.com/zh-cn/cloud/atlas))

```bash
# Create an .env file in server folder and save the statement shown below
WEB_LINK=Your Database Connection Link

# Create an .env file in app folder and save the statement shown below
REACT_APP_API_KEY=Your Google API key
```

### Developed Mode

After you configured all the requirements, you can run the project now:heart:.

```bash
# Run the project
$ npm run dev
```

### Production Mode

When you gonna deploy the project, you need to run build command to build your project

```bash
# Firstly, you should build the frontend project first
$ npm run app-build

# Now, you can build the whole project
$ npm run build

# You can also test it by saying
$ npm start
```

# Built with package

Like I mentioned before, label tool has been separated and released via NPM. Therefore, you can easily install the label tool and integrate it into your project without other pages.

```bash
# install the label tool in your project
$ npm install --save @fgsurewin/react_labeltool
```

## DEMO

##### Live Example🌈: Click it [here](https://codesandbox.io/s/react-label-tool-jteur?file=/src/App.js)

### APIs

#### :question:Types Description

```ts
interface InputLabel {
  x: number; // left
  y: number; // top
  width: number;
  height: number;
  type: string;
  id: string;
  subtype?: string;
}

type TypeConfig = {
  type: string;
  color: string;
  subtype?: string[];
}[];
```

| Name           | Description                                                      | Type                   |
| -------------- | ---------------------------------------------------------------- | ---------------------- |
| **typeConfig** | Type configuration (**required**)                                | TypeConfig             |
| **labels**     | Labels (**required**)                                            | InputLabel[]           |
| **imgUrl**     | Set label image's url (**required**)                             | string                 |
| **Logo**       | Set Logo's url (**required**)                                    | string                 |
| asideWidth     | Set aside's width (Optional)                                     | number                 |
| headerHeight   | Set header's height (Optional)                                   | number                 |
| handleBack     | This function will fire when back button is clicked(Optional)    | (_value_: any) => void |
| handleSubmit   | This function will fire when confirm button is clicked(Optional) | (_value_: any) => void |
| backContext    | Set back button's context (Optional)                             | string                 |
| confirmContext | Set confirm button's context (Optional)                          | string                 |
| handleFinish   | This function will fire when finished labeling(Optional)         | (_value_: any) => void |
| scaleBy        | Set image's scale value (Optional)                               | number                 |
| maxScale       | Set image's maximum scale (Optional)                             | number                 |

:boom:**All functions have a parameter value that contains labels' information**

## Contributing

:tada:Feel free to dive in! [Open an issue](https://github.com/FgSurewin/crsp_crowdsourcing_app/issues/new) or submit PRs.

## License

[MIT](https://github.com/RichardLitt/standard-readme/blob/master/LICENSE) © FgSurewin
