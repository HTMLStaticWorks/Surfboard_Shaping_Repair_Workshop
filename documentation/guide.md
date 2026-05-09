# Customization & Installation Guide

## 1. Installation
The website is built using standard web technologies (HTML/CSS/JS) and does not require a build process.
- Simply upload the files to your web server.
- Ensure the file structure remains intact.

## 2. Color Customization
All colors are managed via CSS variables in `/assets/css/style.css`:
```css
:root {
    --primary: #1A1A1A;
    --secondary: #D6C3A3;
    --accent: #C47A2C;
}
```
Change these values to match your brand.

## 3. Image Replacement
Place your own images in the `/assets/images/` folder and update the `src` attributes in the HTML files. Recommended formats are WebP or optimized JPG.

## 4. Contact Form Setup
The contact form is compatible with Formspree or Netlify Forms. 
- **Formspree**: Replace `YOUR_FORM_ID` in the `action` attribute with your actual Formspree ID.
- **Netlify**: Add the `data-netlify="true"` attribute to the `<form>` tag.

## 5. Integrating Maps
To add your workshop location, get an embed code from Google Maps and replace the placeholder `<div>` in `pages/contact.html`.

## 6. Credits
- **Fonts**: Google Fonts (Poppins, Inter)
- **Icons**: Font Awesome
- **Images**: Unsplash (Placeholders used in template)
- **Logo Icons**: Flaticon
