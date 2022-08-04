This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# Exceprt From Next.js Doc on Deploying With Vercel

After deploying to Vercel, try doing the following:

1. Create a new branch on your app.
1. Make some changes and push to GitHub.
1. Create a new pull request (GitHub help page).

You should see a comment by the vercel bot on the pull request page.
Try clicking on the Preview URL inside this comment. You should see the changes you just made.

When you have a pull request open, Vercel automatically creates a preview deployment for that branch on every push. The preview URL will always point to the latest preview deployment.

You can share this preview URL with your collaborators and get immediate feedback.

If your preview deployment looks good, merge it to main. When you do this, Vercel automatically creates a production deployment.

### Develop, Preview, Ship
The workflow described above is refered to as DPS: Develop, Preview, and Ship.

|Develop|Preview|Ship|
|:---:|:---:|:---:|
|We’ve written code in Next.js and used the Next.js development server running to take advantage of its hot reloading feature.|We’ve pushed changes to a branch on GitHub, and Vercel created a preview deployment that’s available via a URL. We can share this preview URL with others for feedback. In addition to doing code reviews, you can do deployment previews.|We’ve merged the pull request to main to ship to production.|

Next.js documentation strongly recommends using this workflow when developing Next.js apps.

