# Deployment Guide for Hostinger

## Build Steps

1. Prepare the Production Build
```bash
npm run build
```
This will create a `build` folder with production-ready files.

2. Verify the build locally:
```bash
serve -s build
```

## Deployment Steps on Hostinger

1. **Login to Hostinger Control Panel**
   - Go to hpanel.hostinger.com
   - Login with your credentials

2. **Upload Files**
   - Navigate to File Manager
   - Go to public_html folder
   - Upload the contents of your `build` folder

3. **Configure Domain Settings**
   - Go to Domains section
   - Point your domain to Hostinger nameservers if not already done
   - Wait for DNS propagation (may take 24-48 hours)

4. **Configure .htaccess**
   Create or edit the .htaccess file in public_html with:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

5. **SSL Configuration**
   - Go to SSL section in hPanel
   - Enable SSL certificate
   - Force HTTPS redirect

6. **Environment Variables**
   - Update your environment variables in Hostinger
   - Go to Advanced section
   - Add necessary environment variables:
     - REACT_APP_API_URL=your-api-url
     - Other required variables

## Post-Deployment Checks

1. Visit your website and verify:
   - All pages load correctly
   - Images and assets are loading
   - API calls are working
   - Forms are submitting properly

2. Test on different browsers and devices

3. Monitor for any console errors

## Troubleshooting

- If routes don't work, verify .htaccess configuration
- If API calls fail, check environment variables
- If assets don't load, check file permissions
- For SSL issues, contact Hostinger support

## Maintenance

1. For updates:
   - Build locally: `npm run build`
   - Upload new build files
   - Clear browser cache

2. Regular checks:
   - Monitor error logs
   - Check site performance
   - Update SSL certificates if needed