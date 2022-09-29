# Intermediate Git

## Introduction

The core of Git are `commit`, `pull`, and `push`: adding your work to the version tracker, sharing your work where it can be accessed by collaborators and integrations, and bringing in changes made by others. Add in a working knowledge of `branch`ing and you have fundamental Git knowledge: branching is essential to standard workflows (e.g. contributing via GitHub pull request / GitLab merge request (platform-specific terminology for the same thing)), and it opens the door to working on multiple independent things (features, fixes, refactors, etc) in the same timeframe.

Git comes with many, many more functions to aid in managing commits and branches. What I consider intermediate Git is the knowledge of how to use some of those in some common scenarios. The line between intermediate Git and advanced Git is subjective. For me intermediate includes knowing how to use `cherry-pick`, `diff`, `log`, `rebase` and a few of their options, and some of `commit`'s options. Intermediate Git users also have an understanding of how to configure Git, and have made some widely-used changes to their config. And they know some way to visualize Git branches, whether that's in plain text in the terminal or prettied up in a Git GUI app (here we'll be using a GUI).

## Resources

The official Git documentation is at <https://git-scm.com/doc>

The "Reference" section goes into detail with every single Git command.

The "Book" is a book about Git.

Based on r/git I have the impression that someone is telling beginner developers to read the book. It's a fine book, but it covers a lot more than you need even as an advanced user. On the other hand, the Reference has the jargony documentation you might expect from a tech manual, but also lots of real world examples. When I wonder how to do something in Git, the Reference is always the first place I look.


## `git-log`

<https://git-scm.com/docs/git-log>

> Show commit logs

In a terminal, `cd` into a Git repo that has some commits. Run

```shell
git log
```

You'll see a lot of

```
commit <the hash>
Author: <the author and their email address>
Date:   <the date the commit was made>

    <the commit message>
```

What order are they in?

If there are more than fit in a screen, press the <kbd>Enter</kbd> key to scroll down.

To get of the log pager, press the <kbd>q</kbd> key (or scroll all the way to the end).

The first commit in the `git log` output is the commit you're currently on. The rest are all those "reachable from" this commit. This isn't technically accurate, but for our purposes you can think of that as the current commit and all commits that came before it. If you check out a different commit or different branch (unless the different branch you check out is pointing to the commit you were just on) the `git log` output will be different.

That log might have more information than you need. Run

```
git log --oneline
```

Some question I ask on a regular basis are "What was the commit message of the commit I just made?" "What were my last `<n>` commits?" "What are the commits on my current branch?" "What are the commits on that other branch?"

Run

```shell
git log -1
```

Run

```shell
git log -2
```

Check out a feature branch that has one or more commits. Replacing `<base branch>` with the name of the branch the feature branch branches off of, run

```shell
git log --oneline <base branch>..
```

(e.g. `git log --oneline main..`)

Replacing `<the branch name>` with the name of a different feature branch, run

```shell
git log --oneline main..<the branch name>
```

GitHub uses `git-log`-like URLs to compare branches. Go to a GitHub repo that has multiple branches, go to the Pull Requests page, click "Create pull request", select a different "compare" or "base" branch, and when the page finishes updating look at the URL. _GitHub uses three dots `...` for log ranges.

### Git GUI for `git-log`

There are a many Git GUIs to choose from. There are desktop apps, terminal UIs ("TUIs"), VS Code extensions. There are apps that let you do just about every common Git task by clicking buttons, and ones that provide more minimal visualization. I have a full-featured desktop Git GUI open at all times, but still do a lot of command line Git. We'll use one that is primarily a GUI for `git-log`.

Open a Git repo in VS Code. 

Install the VS Code extension [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph).

In VS Code, from the command palette (<kbd>Shift</kbd><kbd>Command</kbd><kbd>P</kbd>) run "Git Graph: View Git Graph (git log)".

Each row is a commit. The colored lines in the graph at the left are branches, one color per branch. The "description" column shows commit messages and, in pills, any branches pointing to that commit.

A Git graph visualization such as this one can complement or even often obviate running `git-log` commands in a terminal.
