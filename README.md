# Building the Theme

```
gulp bump:[major|minor|patch]
gulp build
git ...
git push...
```

# Deploying The Theme

```bash
cd /var/www/blog.relative.media/content/themes && \
wget https://github.com/RelativeMedia/blog.relative.media/raw/master/dist/build-latest.tar.gz && \
setopt rmstarsilent && \
rm -rf relativemedia/*; \
tar -zxvf build-latest.tar.gz -C relativemedia/ && \
rm -rf build-latest.tar.gz &&
pm2 restart blog.relative.media;
```
