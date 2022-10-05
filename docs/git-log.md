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

To get out of the log pager, press the <kbd>q</kbd> key (or scroll all the way to the end).

The first commit in the `git log` output is the commit you're currently on. The rest are all those "reachable from" this commit. This isn't technically accurate, but for our purposes you can think of that as the current commit and all commits that came before it. If you check out a different commit or different branch (unless the different branch you check out is pointing to the commit you were just on) the `git log` output will be different.

That log might have more information than you need. For a compact view, add the `--oneline` flag.

<details><summary>Toggle to show the command</summary>
git log --oneline
</details>

Some questions I ask on a regular basis are "What was the commit message of the commit I just made?" "What were my last `<n>` commits?" "What are the commits on my current branch?" "What are the commits on that other branch?"

`git-log` can give you the log working back from any arbitrary commit, branch, or other ref. Run a `git-log` command to show the one-line log leading up to the commit three commits before `HEAD`.

<details><summary>Toggle to show the command</summary>
git log --oneline HEAD~3
</details>

`HEAD` is always where we're _at_. To save us some keystrokes, Git provides a shorthand for `HEAD`: `@`. Run a `git-log` command to show the same output again the same output again, but this time use the `@` shorthand.

<details><summary>Toggle to show the command</summary>
git log --oneline @~3
</details>

`git-log` can give you the log for a specific number of commits, with the form `git log -<n>`. Run a `git-log` command to show the one-line logs for the checked out commit

<details><summary>Toggle to show the command</summary>
git log -1
</details>

Run a `git-log` command to show the one-line logs for the checked out commit and its two immediate ancestors

<details><summary>Toggle to show the command</summary>
git log -3
</details>

`git-log` can you the logs for all commits within a range. The form is `git log <start>..<end>`. Run a `git-log` command to show the one-line logs the commits between `main` and some branch that branches off of it.

<details><summary>Toggle to show the command</summary>
git log --oneline main..my-feature
</details>

Which commits show? Were both the `<start>` and the `<end>` included in the log?

<details><summary>Toggle to show the commands</summary>
git log --oneline main
git log --oneline my-feature
</details>

<details><summary>Toggle to see the answer</summary>
Start is not included in the output; end is. It's
<pre>
git log &lt;start (exclusive)>..&lt;end (inclusive)>
</pre>
</details>

In `git log <start>..<end>`, `<end>` is optional. If you leave it off Git gives you the diff between `<start>` and `HEAD`.

Check out the feature branch you used in the previus commands. Run a `git-log` command with the same output as the previous command, but this time omit the second ref.

<details><summary>Toggle to show the command</summary>
git log --oneline main..my-feature
</details>

### GitHub URL schemes

GitHub uses `git-log`-like URLs to compare branches. Go to a GitHub repo that has multiple branches, go to the Pull Requests page, click "Create pull request", select a different "compare" or "base" branch, and when the page finishes updating look at the URL. _GitHub uses three dots `...` for log ranges.

## Git tree GUIs

There are a many Git GUIs to choose from. There are desktop apps, terminal UIs ("TUIs"), VS Code extensions. There are apps that let you do just about every common Git task by clicking buttons, and ones that provide more minimal visualization. I have a full-featured desktop Git GUI open at all times, but still do a lot of command line Git. We'll use one that is primarily a GUI for `git-log`.

Open a Git repo in [VS Code](https://code.visualstudio.com/). 

Install the VS Code extension [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph).

In VS Code, from the command palette (<kbd>Shift</kbd><kbd>Command</kbd><kbd>P</kbd>) run "Git Graph: View Git Graph (git log)".

Each row is a commit. The colored lines in the graph at the left are branches, one color per branch. The "description" column shows commit messages and, in pills, any branches pointing to that commit.

A Git graph visualization such as this one can complement or even often obviate running `git-log` commands in a terminal.
