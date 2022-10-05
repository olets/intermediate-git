# Reapplying work

In the tutorial, `cherry-pick` and `rebase` both duplicate commits. The text for a `cherry-pick` lesson says it "plops" a commit. That's good enough for a rough explanation, but in my reading it has an inaccurate implication: that the commit(s) created by the `cherry-pick` or `rebase` are the same as the commits that were "copied". Not exactly right. Let's see why.

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

## Cherry picking

<https://git-scm.com/docs/git-cherry-pick>

> Apply the changes introduced by some existing commits

We'll look at cherry-picking first. Try this example:

1. In a Git repo, create a new branch called `cherry-picking-experiment-base`. No need to check it out.
    <details><summary><u>Toggle to show the command</u></summary>
    git branch cherry-picking-experiment-base
    </details>
1. Create and check out a new branch called `cherry-picking-experiment-1`
    <details><summary><u>Toggle to show individual steps</u></summary>
    <pre>
    git branch cherry-picking-experiment-1
    git checkout cherry-picking-experiment-1
    </pre>
    </details>

    <details><summary><u>Toggle to show a traditional oneliner</u></summary>
    git checkout -b cherry-picking-experiment-1
    </details>

    <details><summary><u>Toggle to show a modern oneliner</u></summary>
    git switch -c cherry-picking-experiment-1
    </details>
1. In your editor (or via the command line if you prefer) create a new file `cherry-picking-experiment` with this content:
   ```
   a
   b
   c
   ```
1. Save, the file, and commit the change with the commit message "abc".
    <details><summary><u>Toggle to show the commands</u></summary>
    git add cherry-picking-experiment
    git commit -m "abc"
    </details>
1. [`git-diff`](https://git-scm.com/docs/git-diff) is a command to "show changes between commits, commit and working tree, etc". A common use for it is to see everything that changed between two commits, the command structure for which is `git diff <base> <change>`. Run a single `git-diff` command to show the "diff" (from _difference_) introduced by `cherry-picking-experiment-1` relative to `cherry-picking-experiment-base`.

    <details><summary><u>Toggle to show the command</u></summary>
    git diff cherry-picking-experiment-base cherry-picking-experiment-1
    </details>

    Some things you can see in that output:

    - the "before" and "after" commits IDs, truncated to seven characters
    - the name of the file that changed
    - the specific lines that changed, and what changed

    Order matters. Run a `git-diff` command to show the opposite change.

    <details><summary><u>Toggle to show the command</u></summary>
    git diff cherry-picking-experiment-1 cherry-picking-experiment-base
    </details>

    In practice it's unusual to run `git-diff` in this second order. The purpose of running it "backwards" is to highlight the risk of forgetting the command structure.

    We've seen the relative units pattern `<ref>~[<n>]`. Run a `git-diff` command that has the same output as the first of the two above, but use a relative reference instead of `cherry-picking-experiment-base`.

    <details><summary><u>Toggle to show the command</u></summary>
    git diff cherry-picking-experiment-1~ cherry-picking-experiment-1
    </details>

    We've seen that `HEAD` is always where we're at. Run a `git-diff` command to get that same output again, but this time use `HEAD` as a shorter way of naming the checked out branch.

    <details><summary><u>Toggle to show the command</u></summary>
    git diff HEAD~ HEAD
    </details>

    `HEAD` is always where we're _at_. To save us some keystrokes, Git provides a shorthand for `HEAD`: `@`. Run a `git-diff` command with the same output again, but this time use the `@` shorthand.

    <details><summary><u>Toggle to show the command</u></summary>
    git diff @~ @
    </details>

    In the `git diff <ref1> <ref2>` form, `<ref2>` is optional. If you leave it off Git gives you the diff between `<ref1>` and `HEAD`. Run a `git-diff` command with the same output again, but this time omit the second ref.

    <details><summary><u>Toggle to show the command</u></summary>
    git diff @~
    </details>

    Another form of `git-diff` uses two dots between the two commits: `git diff <ref1>..<ref2>` is equivalent to `git diff <ref1> <ref2>`.
1. From where you are, create and check out a new branch called `cherry-picking-experiment-2`
1. Change the file `cherry-picking-experiment` to have this content:
   ```
   d
   b
   e
   ```
1. Save, add, commit with the message "dbe"
1. Run a `git-diff` command to see the changeset introduced by the commit you just made
    <details><summary><u>Toggle to show the command</u></summary>
    git diff @~
    </details>

    Take a moment to read the output and see that the diff is what you expect based on the change you committed.
1. Check out `cherry-picking-experiment-1`
1. Change the file `cherry-picking-experiment` to have this content:
    ```
    d
    b
    c
    ```
1. Save, add, commit with the message "dbc"
1. Run a `git-diff` command to see the changeset introduced by the commit you just made
    <details><summary><u>Toggle to show the command</u></summary>
    git diff @~
    </details>
1. Hold in your mind the current Git graph - the three branches, the commits, and what each did
    <details><summary><u>Toggle to see the graph</u></summary>
    <pre>
    (cherry-picking-experiment-base) &lt; abc &lt; dbc(cherry-picking-experiment-1)
                                      \
                                        dbe(cherry-picking-experiment-2)
    </pre>
    </details>

    Or [use a Git GUI to visualize it](/finding-out-what-commits-have-been-made.html#git-tree-guis).

    Cherry pick the "tip" commit of the branch `cherry-picking-experiment-2`

    <details><summary><u>Toggle to show the command</u></summary>
    git cherry-pick cherry-picking-experiment-2
    </details>

    The output logged by the `git-cherry-pick` command has a notable difference from (if you scroll up in your terminal) the output logged by the last `git-commit` command you ran in `cherry-picking-experiment-2` — that is, from the output logged when you created the commit you just cherry-picked into `cherry-picking-experiment-1`.

    <details><summary><u>Toggle to show the difference I'm refering to</u></summary>
    The <code>commit</code> command log said
    <pre>
    1 file changed, 2 insertions(+), 2 deletions(-)
    </pre>
    meaning that 2 lines were added and 2 lines were deleted (the deleted lines and inserted lines were in fact the same lines, so it's really "2 lines changes"). The <code>cherry-pick</code> command log said
    <pre>
    1 file changed, 1 insertion(+), 1 deletion(-)
    </pre>
    meaning that _1_ line was added and 1 _line_ was deleted
    </details>

    Why the difference?
    
    If you see where I'm going, see it out with me if only for the muscle memory practice of running these commands. Run a `git-diff` command to see the changeset introduced by the commit the `git-cherry-pick` command created.

    <details><summary><u>Toggle to show the command</u></summary>
    git diff @~
    </details>

    Compare that to the changeset introduced by the cherry-picked commit.

    <details><summary><u>Toggle to show the command</u></summary>
    git diff cherry-picking-experiment-2~ cherry-picking-experiment-2
    </details>
    
    Different diff. Why?

    <details><summary><u>Toggle to show why</u></summary>
    Part of the changeset introduced by the commit in `cherry-picking-experiment-2` had already been made in `cherry-picking-experiment-1` before the `git-cherry-pick` command was run. The commit in `cherry-picking-experiment-2` changes the first and third lines of our file. Before cherry picking, we made a commit in `cherry-picking-experiment-1` which introduced the line 1 change.
    </details>

## Rebasing

<https://git-scm.com/docs/git-rebase>

> Reapply commits on top of another base tip

This same principle —that when a commit is reapplied to a different ancestor the new commit's diff relative to its immediate ancestor is not necessarily the same as the old commit's diff relative to _its_ immediate ancestor— applies in rebasing too.
1. Create a new branch called `cherry-picking-experiment-3` pointing to the same commit as `cherry-picking-experiment-2`. No need to check it out.
    <details><summary><u>Toggle to show individual steps</u></summary>
    <pre>
    git checkout cherry-picking-experiment-2
    git branch cherry-picking-experiment-3
    </pre>
    </details>

    <details><summary><u>Toggle to show a oneliner</u></summary>
    git branch cherry-picking-experiment-3 cherry-picking-experiment-2
    </details>
1. Create and check out a new branch called `cherry-picking-experiment-4` pointing to the commit as `cherry-picking-experiment-1` was at before you cherry picked.
    <details><summary><u>Toggle to show individual steps</u></summary>
    <pre>
    git branch cherry-picking-experiment-4 cherry-picking-experiment-1~
    git checkout cherry-picking-experiment-4
    </pre>
    </details>

    <details><summary><u>Toggle to show a traditional oneliner</u></summary>
    git checkout -b cherry-picking-experiment-4 cherry-picking-experiment-1~
    </details>

    <details><summary><u>Toggle to show a modern oneliner</u></summary>
    git switch -c cherry-picking-experiment-4 cherry-picking-experiment-1~
    </details>
1. Hold in your mind the current Git graph
    <details><summary><u>Toggle to see the graph</u></summary>
    <pre>
    (cherry-picking-experiment-base) &lt; abc &lt; dbc(cherry-picking-experiment-4) &lt; dbe'(cherry-picking-experiment-1)
                                      \
                                        dbe(cherry-picking-experiment-2,cherry-picking-experiment-3)
    </pre>
    </details>

    Or [use a Git GUI to visualize it](/finding-out-what-commits-have-been-made.html#git-tree-guis).
1. Rebase `cherry-picking-experiment-3` off `cherry-picking-experiment-4`
    <details><summary><u>Toggle to show the commands</u></summary>
    <pre>
    git checkout cherry-picking-experiment-3
    git rebase cherry-picking-experiment-4
    </pre>
    </details>
1. Now we have
    ```
    (cherry-picking-experiment-base) < abc < dbc(cherry-picking-experiment-4) < dbe''(cherry-picking-experiment-3)
                                      \                                       \
                                        dbe(cherry-picking-experiment-2)        dbe'(cherry-picking-experiment-1)
    ```
    `git-diff` will confirm that the changeset introduced by the commit `cherry-picking-experiment-3` is pointing to (the commit created by the rebase) is different from the changeset introduced the commit `cherry-picking-experiment-3` pointed to before it was rebased (the commit `cherry-picking-experiment-2` points to) but the same as the changeset introduced by the commit `cherry-picking-experiment-1` is pointing to (the commit created by the cherry-picking): the commits `cherry-picking-experiment-1` and `cherry-picking-experiment-3` point to only changed the third line of our file, while the commit `cherry-picking-experiment-2` points to changed the first and third lines.

## What this means for the user

This behavior is exactly what we want. When we cherry pick, Git determines the diff relative to `HEAD` necessary to bring in the changes introduced by the cherry picked commit. Rebasing is the same. (The difference is the associated branch management when the command finishes. When cherry picking finishes the checked out branch is updated to point to the last commit created by the cherry picking; when rebasing finishes the rebased branch is updated to point to the last commit created by the rebase.)

This is fundamental to how key Git commands including `git-cherry-pick`, `git-rebase`, and `git-merge` work under the hood. Under the hood is under the hood, and in basic scenarios the user doesn't interact with the algorithms for determining changesets. But there are scenarios where Git will be conflicted about the changeset necessary to apply a commit to a different ancestor. When that happens and Git asks for your help manually resolving the questions it's unable to resolve on its own, an understanding of what it is that Git is _trying_ to do can make the situation less daunting.