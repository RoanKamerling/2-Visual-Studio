# 2-Visual-Studio

## Automatisch pushen naar GitHub

VS Code start de taak `Auto-push website changes` wanneer deze workspace wordt geopend. Na het opslaan van `index.html`, `styles.css` of `app.js` maakt de taak na een korte pauze automatisch een commit en pusht die naar `origin/main`. Alleen die drie websitebestanden worden meegenomen; overige staged bestanden blijven buiten de commit.

De taak vereist een werkende GitHub-authenticatie en commitidentiteit. Pushfouten verschijnen in de taakuitvoer. Om automatisch pushen te stoppen, beëindig je de taak `Auto-push website changes` in VS Code.