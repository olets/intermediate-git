# Create a Git playground

Not an "intermediate" topic, but we'll need a Git repo to experiment in.

Run commands to
- create a new Git repo
- make a first commit

:::: details Toggle to reveal my solution
```shell
cd my-development-directory
mkdir intermediate-git
cd intermediate-git
git init
git commit --allow-emtpy -m "initial (empty)"
```
The first commit doesn't _have_ to be empty. This or many other solutions would work too:
```shell
touch README.md
git add README.md
git commit
```
::: tip Side Adventure
If that "`git commit --allow-empty` for the first commit" workflow is new to you, there are a lot of blog posts and StackOverflow answers which talk about it.
:::
::::