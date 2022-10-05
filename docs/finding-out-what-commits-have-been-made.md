# Finding out what commits have been made

## As a list

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

To get out of the log pager, press the <kbd>q</kbd> key (or scroll all the way to the end).

The first commit in the `git log` output is the commit you're currently on. The rest are all those "reachable from" this commit. This isn't technically accurate, but for our purposes you can think of that as the current commit and all commits that came before it. If you check out a different commit or different branch (unless the different branch you check out is pointing to the commit you were just on) the `git log` output will be different.

### Compact view

That log might have more information than you need. For a compact view, add the `--oneline` flag.

<details><summary><u>Toggle to show the command</u></summary>
git log --oneline
</details>

### Specifying the endpoint

Some questions I ask on a regular basis are "What was the commit message of the commit I just made?" "What were my last `<n>` commits?" "What are the commits on my current branch?" "What are the commits on that other branch?"

`git-log` can give you the log working back from any arbitrary commit, branch, or other ref. Run a `git-log` command to show the one-line log leading up to the commit three commits before `HEAD`.

<details><summary><u>Toggle to show the command</u></summary>
git log --oneline HEAD~3
</details>

`HEAD` is always where we're _at_. To save us some keystrokes, Git provides a shorthand for `HEAD`: `@`. Run a `git-log` command to show the same output again the same output again, but this time use the `@` shorthand.

<details><summary><u>Toggle to show the command</u></summary>
git log --oneline @~3
</details>

### Specifying the count

`git-log` can give you the log for a specific number of commits, with the form `git log -<n> <ref>`. Run a `git-log` command to show the one-line logs for `HEAD`

<details><summary><u>Toggle to show the command</u></summary>
git log -1 @
</details>

There's no reason to ever run that last command. In `git log -<n> <ref>` the `<ref>` is optional. Leaving it off is equivalent to specifying `@` (or `HEAD`). Run a `git-log` command equivalent to the previous one but shorter.

<details><summary><u>Toggle to show the command</u></summary>
git log -1
</details>

Run a `git-log` command to show the one-line logs for `HEAD` and its two immediate ancestors

<details><summary><u>Toggle to show the command</u></summary>
git log -3
</details>

### Specifying a range

`git-log` can you the logs for all commits within a range. The form is `git log <start>..<end>`. Run a `git-log` command to show the one-line logs the commits between `main` and some branch that branches off of it.

<details><summary><u>Toggle to show the command</u></summary>
git log --oneline main..my-feature
</details>

What exactly is `git log <start>..<end>` showing? Run `git-log` commands to determine whether both `<start>` and `<end>` were included in that output. _Tip: the commands won't tell you directly, but together with the previous command's output they'll give you the answer._

<details><summary><u>Toggle to show the commands</u></summary>
git log --oneline main
git log --oneline my-feature
</details>

<details><summary><u>Toggle to see the answer</u></summary>
Start is not included in the output; end is. It's
<pre>
git log &lt;start (exclusive)>..&lt;end (inclusive)>
</pre>
</details>

In `git log <start>..<end>`, `<end>` is optional. If you leave it off Git gives you the diff between `<start>` and `HEAD`.

Check out the feature branch you used in the previus commands. Run a `git-log` command with the same output as the previous command, but this time omit the second ref.

<details><summary><u>Toggle to show the commands</u></summary>
git checkout my-feature
git log --oneline main..
</details>

## As a tree visualization

You can get really fancy with `git-log`. The `--graph` option will present the commit logs as a "tree graph", which can be helpful for understanding how branches relate to each other. (For examples, see [Reapplying work](/reapplying-work).) Try this in a Git repo that has a lot of branches:

```shell
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s%n' --abbrev-commit --date=relative --branches
```

It can get even prettier if we move from the terminal to a Git GUI. There are a many Git GUIs to choose from. There are desktop apps, terminal UIs ("TUIs"), VS Code extensions. There are apps that let you do just about every common Git task by clicking buttons, and ones that provide more minimal visualization. Some people find them useful in some circumstances, some people love them, some people think "real" developers don't use GUI. I do a lot of my Git work on the command line, and I have a desktop Git GUI open at all times, largely to have the full tree visualization always at hand.

Let's try one!

1. Open a Git repo in [VS Code](https://code.visualstudio.com/).
1. Install the VS Code extension [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph).
1. From VS Code the command palette (<kbd>Shift</kbd><kbd>Command</kbd><kbd>P</kbd>) run "Git Graph: View Git Graph (git log)".

Each row is a commit. The colored lines in the graph at the left are branches, one color per branch. The "description" column shows commit messages and, in pills, any branches pointing to that commit.

Clicking on a row reveals `git-log` details and the changeset introduced by the commit. (For more on that see [Reapplying Work](/reapplying-work).)

A Git graph visualization such as this one can complement or even often obviate running `git-log` commands in a terminal.
