# Finding out what commits have been made

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

Some questions I ask on a regular basis are "What was the commit message of the commit I just made?" "What were my last `<n>` commits?" "What are the commits on my current branch?" "What are the commits on that other branch?"

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

## Git GUI for `git-log`

There are a many Git GUIs to choose from. There are desktop apps, terminal UIs ("TUIs"), VS Code extensions. There are apps that let you do just about every common Git task by clicking buttons, and ones that provide more minimal visualization. I have a full-featured desktop Git GUI open at all times, but still do a lot of command line Git. We'll use one that is primarily a GUI for `git-log`.

Open a Git repo in VS Code. 

Install the VS Code extension [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph).

In VS Code, from the command palette (<kbd>Shift</kbd><kbd>Command</kbd><kbd>P</kbd>) run "Git Graph: View Git Graph (git log)".

Each row is a commit. The colored lines in the graph at the left are branches, one color per branch. The "description" column shows commit messages and, in pills, any branches pointing to that commit.

A Git graph visualization such as this one can complement or even often obviate running `git-log` commands in a terminal.
