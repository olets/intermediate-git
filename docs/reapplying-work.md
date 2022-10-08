# Reapplying work

::: warning PREREQUISITES
- Knowledge of how to run shell commands in a terminal
- Familiarity with Git concepts of commits, commit messages, and commit ancestors
- A Git repo to work in (see [Create a Git playground](./create-a-git-playground.md))
- Familiarity with Git relative references
- Familiarity with `git cherry-pick` and `git rebase`
:::

::: tip
I recommend visualizing the commit graph while working through this. See [Visualizing commit graphs](/finding-out-what-commits-have-been-made.html#visualizing-commit-graphs).
:::

::: danger HOLD UP
Before expanding toggles, try things out on your own!
:::

## Introduction

Some Git tutorials present `cherry-pick` and `rebase` as duplicating commits. That's good enough for a basic understanding but not exactly right. The difference doesn't immediately affect the Git user in typical scenarios. But looking into it may help solidify your mental model of Git, and builds a foundation for knowing what to do when cherry picking or rebasing gets tricky.

We'll use

- `git-cherry-pick`

    <https://git-scm.com/docs/git-cherry-pick>

    > Apply the changes introduced by some existing commits
- `git-rebase`

    <https://git-scm.com/docs/git-rebase>

    > Reapply commits on top of another base tip
- `git-diff`

    <https://git-scm.com/docs/git-diff>
    
    > Show changes between commits, commit and working tree, etc

## Set the stage for cherry picking

1. In your repo, create a new branch called `reapplying-base`. No need to check it out.
    ::: details Toggle to reveal my solution
    ```shell
    git branch reapplying-base
    ```
    :::
1. Create and check out a new branch called `reapplying-1`
    ::::: details Toggle to reveal my solutions
    Click a tab to see other solutions
    :::: code-group
    ::: code-group-item Individual steps
    ```shell
    git branch reapplying-1
    git checkout reapplying-1
    ```
    :::
    ::: code-group-item Traditional oneliner
    ```shell
    git checkout -b reapplying-1
    ```
    :::
    ::: code-group-item Modern oneliner
    ```shell
    git switch -c reapplying-1
    ```
    :::
    ::::
    :::::
1. In your editor (or via the command line if you prefer) create a new file `reapplying` with this content:
   ```
   a
   b
   c
   ```
1. Save, the file, and commit the change with the commit message "reapplying-abc".
    ::: details Toggle to reveal my solution
    ```shell
    git add reapplying
    git commit -m "abc"
    ```
    :::
1. From where you are, create and check out a new branch called `reapplying-2`
1. Change the file `reapplying` to have this content:
   ```
   d
   b
   e
   ```
1. Save, add, commit with the message "reapplying-dbe"
1. Check out `reapplying-1`
1. Change the file `reapplying` to have this content:
    ```
    d
    b
    c
    ```
1. Save, add, commit with the message "dbc"

This is what we've built. You could also [use a Git GUI to visualize it](/finding-out-what-commits-have-been-made.html#visualizing-commit-graphs) as you go.

```
(reapplying-base) < reapplying-abc < reapplying-dbc(reapplying-1*)
                                   \
                                     reapplying-dbe(reapplying-2)
```

I'm using parentheses to denote branch names, and `*` to denote the checked out branch.

(The exact placement of `reapplying-1` and `reapplying-2` is arbitrary. `reapplying-1` could just as well be below `reapplying-2`. Instead of one inline with `reapplying-abc` and one shifted down, it could be one inline and one shifted up. Or one shifted up and one shifted down. For that matter `reapplying-abc` and `reapplying-base` don't have to be aligned with each other. The important thing is the topology. By convention ancestry is drawn in a single direction. Here that's left to right, which is common. And by convention a minimal topology is used, sticking to a primary axis whenever possible.)

## Inspect the changes each commit made

[`git-diff`](https://git-scm.com/docs/git-diff) is a command to "show changes between commits, commit and working tree, etc". A common use for it is to see everything that changed between two commits, the command structure for which is `git diff <base> <change>`.

1. Run a single `git-diff` command to show the "diff" (from _difference_) introduced by `reapplying-1` relative to `reapplying-base`.

    ::: details Toggle to reveal my solution
    ```shell
    git diff reapplying-base reapplying-1
    ```
    :::

    Some things you can see in that output:

    - the "before" and "after" commits IDs, truncated to seven characters
    - the name of the file that changed
    - the specific lines that changed, and what changed

1. Order matters. Run a `git-diff` command to show the opposite change.

    ::: details Toggle to reveal my solution
    ```shell
    git diff reapplying-1 reapplying-base
    ```
    :::

    ::: tip
    In practice it's unusual to run `git-diff` in this ancestor-first order. The purpose of running it "backwards" here is to highlight the risk of forgetting the command structure.
    :::

1. You can use relative references (like `<ref>~3`) with `git-diff`. Run a command that returns the difference between `reapplying-1` and its immediate ancestor.

    ::: details Toggle to reveal my solution
    ```shell
    git diff reapplying-1~1 reapplying-1
    ```
    :::

1. The relative reference pattern is `<ref>~[<n>]` where the square brackets to signify that `<n>` is optional. If you leave it off Git assumes `1`. Run a command which has the same output as the previous one but which is shorter

    ::: details Toggle to reveal my solution
    ```shell
    git diff reapplying-1~ reapplying-1
    ```
    :::

1. We've seen that `HEAD` is always where we're at. Run a `git-diff` command to get that same output again, but this time use `HEAD` as a shorter way of naming the checked out branch.

    ::: details Toggle to reveal my solution
    ```shell
    git diff HEAD~ HEAD
    ```
    :::

1. `HEAD` is always where we're _at_. To save us some keystrokes, Git provides a shorthand for `HEAD`: `@`. Run a `git-diff` command with the same output again, but this time use the `@` shorthand.

    ::: details Toggle to reveal my solution
    ```shell
    git diff @~ @
    ```
    :::

1. In the `git diff <ref1> <ref2>` form, `<ref2>` is optional. If you leave it off Git gives you the diff between `<ref1>` and `HEAD`. Run a `git-diff` command with the same output again, but this time omit the second ref.

    ::: details Toggle to reveal my solution
    ```shell
    git diff @~
    ```
    :::

    Another form of `git-diff` uses two dots between the two commits: `git diff <ref1>..<ref2>` is equivalent to `git diff <ref1> <ref2>`.

## Cherry pick

1.  Cherry pick the "tip" commit of the branch `reapplying-2` (the commit the branch is pointing to)

    ::: details Toggle to reveal my solution
    ```shell
    git cherry-pick reapplying-2
    ```
    :::

1. Run commands to inspect the difference introduced by the commit you cherry picked and to inspect the change introduced by the commit created by the cherry picking.

    ::: details Toggle to reveal my solution
    ```shell
    git diff reapplying-2~ reapplying-2
    git diff @~
    ```
    :::

Different diff. Why?

Part of the changeset introduced by the commit `reapplying-2` is pointing to had already been made in `reapplying-1` before the `git-cherry-pick` command was run. The commit in `reapplying-2` changes the first and third lines of our file. Before cherry picking, we made a commit in `reapplying-1` which introduced the line 1 change.

Specifically, the commit we cherry picked (the `reapplying-dbe` commit) changed `a` to `d` and changed `c` to `e`. We cherry picked it with `HEAD` pointing to the `reapplying-dbc` commit.

Git recognized that of the two lines the `reapplying-dbe` commit changed only the second (`c` to `e`) was different from `HEAD`. So the new commit created by cherry picking only changes one line.

Put that way it might feel intuitive and not worth all the trouble we took to get here — after all it would be meaningless to change the `reapplying-dbc` commit's `d` to a `d`. But there are scenarios where Git _isn't_ able to recognize what needs to happen in a `cherry-pick` and relies on the user to step in. Knowing how the system works can help the user understand what's going on in those scenarios. We'll get there but first:

## Set the stage for rebasing

This same principle —that when a commit is reapplied to a different ancestor the new commit's diff relative to its immediate ancestor is not necessarily the same as the old commit's diff relative to _its_ immediate ancestor— applies in rebasing too.
1. Create a new branch called `reapplying-3` pointing to the same commit as `reapplying-2`. No need to check it out.
    ::::: details Toggle to reveal my solutions
    Click a tab to see other solutions
    :::: code-group
    ::: code-group-item Individual steps
    ```shell
    git checkout reapplying-2
    git branch reapplying-3
    ```
    :::
    ::: code-group-item Oneliner
    ```shell
    git branch reapplying-3 reapplying-2
    ```
    :::
    :::::
1. Create and check out a new branch called `reapplying-4` pointing to the commit as `reapplying-1` was at before you cherry picked.
    ::::: details Toggle to reveal my solutions
    Click a tab to see other solutions
    :::: code-group
    ::: code-group-item Individual steps
    ```shell
    git checkout reapplying-1~
    git branch reapplying-4
    git checkout reapplying-4
    ```
    :::

    ::: code-group-item Traditional oneliner
    ```shell
    git checkout -b reapplying-4 reapplying-1~
    ```
    :::

    ::: code-group-item Modern oneliner
    ```shell
    git switch -c reapplying-4 reapplying-1~
    ```
    :::
    ::::
    :::::

This is what we've created:

```
(reapplying-base) < reapplying-abc < reapplying-dbc(reapplying-4*) < reapplying-dbe'(reapplying-1)
                                   \
                                     reapplying-dbe(reapplying-2,reapplying-3)
```

## Rebase

1. Rebase `reapplying-3` off `reapplying-4`
    ::::: details Toggle to reveal my solutions
    Click a tab to see other solutions
    :::: code-group
    ::: code-group-item Individual steps
    ```shell
    git checkout reapplying-3
    git rebase reapplying-4
    ```
    :::

    ::: code-group-item Oneliner
    ```shell
    git rebase reapplying-4 reapplying-3
    ```
    :::
    ::::
    :::::
1. Now we have
    ```
    (reapplying-base) < reapplying-abc < reapplying-dbc(reapplying-4) < reapplying-dbe''(reapplying-3*)
                                       \                              \
                                         reapplying-dbe(reapplying-2)   reapplying-dbe'(reapplying-1)
    ```

    To clarify the history I've added apostrophes (`'`) to denote commits creating by cherry picking or rebasing. Those won't appear in `git-log` or a Git graph visualization.

    `git-diff` will confirm that the changeset introduced by the commit `reapplying-3` is pointing to (the commit created by the rebase) is different from the changeset introduced the commit `reapplying-3` pointed to before it was rebased (the commit `reapplying-2` points to) but the same as the changeset introduced by the commit `reapplying-1` is pointing to (the commit created by the cherry-picking): the commits `reapplying-1` and `reapplying-3` point to only changed the third line of our file, while the commit `reapplying-2` points to changed the first and third lines.

    That is: `git diff reapplying-dbe'~..reapplying-dbe` is the same as `git diff reapplying-dbe''~..reapplying-dbe''`, but both are different from `git diff reapplying-dbe~..reapplying-dbe` — even though both are reapplications of `reapplying-dbe` (`reapplying-dbe'` by cherry picking `reapplying-dbe`, and `reapplying-dbe''` by rebasing `reapplying-dbe'`).

## What this means for the user

This behavior is exactly what we want. When we cherry pick, Git determines the diff relative to `HEAD` necessary to bring in the changes introduced by the cherry picked commit. Rebasing is the same. (The difference is the associated branch management when the command finishes. When cherry picking finishes the checked out branch is updated to point to the last commit created by the cherry picking; when rebasing finishes the rebased branch is updated to point to the last commit created by the rebase.)

This is fundamental to how key Git commands including `git-cherry-pick` and `git-rebase` work under the hood. Under the hood is under the hood, and in basic scenarios the user doesn't interact with the algorithms for determining changesets. But there are scenarios where Git will be conflicted about the changeset necessary to apply a commit to a different ancestor. When that happens and Git asks for your help manually resolving the questions it's unable to resolve on its own, an understanding of what it is that Git is _trying_ to do can make the situation less daunting.