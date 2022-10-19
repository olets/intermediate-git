# Helping Git overcome blocks

::: warning PREREQUISITES
- Knowledge of how to run shell commands in a terminal
- Familiarity with Git concepts of commits, commit messages, and commit ancestors
- A Git repo to work in (see [Create a Git playground](./create-a-git-playground.md))
- Familiarity with Git relative references
- Familiarity with `git cherry-pick` and `git rebase`
- An understanding of what ends up in commits created by cherry picking and rebasing (see [Reapplying work](./reapplying-work.md))
:::

::: tip
I recommend visualizing the commit graph while working through this. See [Visualizing commit graphs](/finding-out-what-commits-have-been-made.html#visualizing-commit-graphs).
:::

::: danger HOLD UP
Before expanding toggles, try things out on your own!
:::

## Introduction

In what the Git docs call the "easy case", Git is able to determine how to apply the changes introduced by an existing commit to an arbitrary ancestor. That is, Git can tell what your files should look like after running a `git-cherry-pick` or `git-rebase` command. It can tell, so it makes the necessary and commits it. There's also a "hard case", in which the correct end state is ambiguous. When Git hits a hard case it doesn't make a commit; instead it asks the user to step in and make a decision.

Our focus is to understand how conflicts arise. Since we're here we'll also look at the practical workflow of resolving and moving past them.

## Set the stage

This is similar to what we did in [Reapplying work](./reapplying-work.md):

1. Create a new branch called `conflicting-base` pointing to the same commit as `main`
    ::::: details Toggle to reveal my solutions
    Click a tab to see other solutions
    :::: code-group
    ::: code-group-item Individual steps
    ```shell
    git checkout main
    git branch conflicting-base
    ```
    :::
    ::: code-group-item Oneliner
    ```shell
    git branch conflicting-base main
    ```
    :::
    ::::
    :::::
1. Create a new branch called `conflicting-1` pointing to that same commit, and check it out
    ::::: details Toggle to reveal my solutions
    Click a tab to see other solutions
    :::: code-group
    ::: code-group-item Individual steps
    ```shell
    git checkout conflicting-base
    git branch conflicting-1
    git checkout conflicting-1
    ```
    :::
    ::: code-group-item Traditional oneliner
    ```shell
    git checkout -b conflicting-1 conflicting-base
    ```
    :::
    ::: code-group-item Modern oneliner
    ```shell
    git switch -c conflicting-1 conflicting-base
    ```
    :::
    ::::
    :::::
1. Create a new file called "conflicting" and give it content
    ```
    a
    b
    c
    ```
    and commit it with the commit message `conflicting-abc`

    ::: details Toggle to reveal my solution
    Create, edit, and save the file, then
    ```shell
    git add conflicting
    git commit -m "conflicting-abc"
    ```
    :::
1. From where you are, create and check out a new branch called `conflicting-2`
1. Change the file `conflicting` to have this content:
   ```
   d
   b
   e
   ```
1. Save, add, commit with the message "conflicting-dbe"
1. Check out `conflicting-1`
1. Change the file `conflicting` to have this content:
    ```
    f
    b
    c
    ```
1. Save, add, commit with the message "fbc"

This is what we've built. You could also [use a Git GUI to visualize it](/finding-out-what-commits-have-been-made.html#visualizing-commit-graphs) as you go.

```
(conflicting-base) < conflicting-abc < conflicting-fbc(conflicting-1*)
                                     \
                                       conflicting-dbe(conflicting-2)
```

## Create conflict

1. Rebase `conflicting-2` off `conflicting-1` (or attempt to…).

    ::: danger PAUSE
    It's a good habit to read the rebase output. Git's output is generally clear and helpful. In this case the error output includes "hints" for what to do next.
    
    This time read it but don't yet do what it says to do! First we'll look into what happened.
    :::

    ::::: details Toggle to reveal my solutions
    Click a tab to see other solutions
    :::: code-group
    ::: code-group-item Individual steps
    ```shell
    git checkout conflicting-2
    git rebase conflicting-1
    ```
    :::
    ::: code-group-item Oneliner
    ```shell
    git rebase @ conflicting-2
    ```
    :::
    ::::
    :::::

## Shine a light on the conflict

1. `git status` tells you the current Git state. Run it, and read the output.
1. The status shows that something is up with the file `conflicting`. But what? `git diff` without any other options outputs your unstaged changes. Run it.
1. The output shows us a one line conflict. Between the `<<< HEAD` line and the `===` line is the version of this line at `HEAD`. Between the `===` line and the `>>> a-commit-id (conflicting-2)` line is the version of this line at `conflicting-2`. The `<<<`, `===`, and `>>>` are "start of before / start of conflict", "end of before / start of after", and "end of after / end of conflict".

Back in the "easy case" of cherry picking and rebasing, we got into how Git determines what changes a reapplied commit needs to make. Part of what Git does is check whether it can make the same change in this new context. We saw before what happens if there's no change to be made: it doesn't make a change. But what if the change _can't_ be made?

The difference introduced by the `conflicting-2` commit is to change line one of `conflicting` from `a` to `f`. Git asks "can the a-to-f change be applied to the branch `conflicting-1`"? No: in `conflicting-1` we've already changed `a` to `d`, so there's no `a` to change to `f`.

## Resolving conflicts

Clearing this up is straight forward provided you know what the desired final result is.

In this case let's assume we really want line 1 of `conflicting` to be `a`.

`git-diff` shows file differences. That `<<< === >>>` business is actually in the file, inserted by Git. To resolve the conflict we'll delete the version we don't want, delete the three conflict marker lines, save, stage the file, commit, and then —as "hinted" in the rebase output— run `git rebase --continue`. 

1. Open the `conflicting` file. VS Code makes this even easier, with buttons to "accept current," "accept both," and "accept incoming". Click one of them. Undo. Click one of the others. Undo. Click the other. Save.
1. Stage the file and commit.

    ::: details Toggle to reveal my solution
    ```shell
    git add conflicting
    git commit -m "(your-message-here)"
    ```
    :::
1. Tell Git you've unblocked it and that it can continue rebasing.

    ::: details Toggle to reveal my solution
    ```shell
    git rebase --continue
    ```
    :::

If the branch we were rebasing had multiple commits, Git would reapply each of them in turn now. But we just had the one, so Git cleans up its "there's a rebase in progress" files, and the rebase is done.

::: warning TODO
What's up with the two lines after the `>>>` line?

Add exercise of
- a conflict on the first and second lines
- a conflict on the first and third lines

Consider adding an exercise before the existing three-line-file one: a single-line file.
:::

::: warning TODO
The exact same thing applies when merging

Add section explaining conflicts in the context of merge commits.
:::

## How this comes up

There's a good chance —don't say risk, it's no big deal— of conflicts coming up when working on multiple features in the same part of a codebase.

Maybe you've been given two tasks, you worked on them in separate branches, and the work for both made a change to a shared component. They're both ready to merge. You merge the first without a hitch. You go to merge the second… and conflict! At least you understand both changes.

It can be trickier if the conflict is related to collaboration. You and a collaborator work independently on a separate features, and you both change shared component. Your collaborator's feature merges without a hitch. You go to merge your feature… and conflict! Now you'll have to figure out why your collaborator made the change they made, and figure out the change that will work for your needs and theirs.

In either case, take out the commit markers, update the file so that both features are as expected, commit, rebase --continue.