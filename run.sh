#!/bin/bash

for j in {001..200}
do
    Y=$((2018+$(($RANDOM % 2))))
    startm=1
    endm=6
    M=$(($startm+$RANDOM%($endm-$startm+1)))
    D=$(($RANDOM%31+1))
    bugcnt=$(($RANDOM%15+1))
    echo "$bugcnt"
    #echo "$i bugs fixed on $M/$D/$Y"
    echo "$bugcnt bugs fixed on $M/$D/$Y" > commit.md
    tt=$(($RANDOM % 12))
    mm=$(($RANDOM % 60))
    ss=$(($RANDOM % 60))
    export GIT_COMMITTER_DATE="$Y-$M-$D $tt:$mm:$ss"
    echo "$Y-$M-$D $tt:$mm:$ss"
    export GIT_AUTHOR_DATE="$Y-$M-$D $tt:$mm:$ss"
    git add commit.md -f
    git commit --date="$Y-$M-$D $tt:$mm:$ss" -m "$bugcnt bugs fixed on $M/$D/$Y"
done
git push origin master --force
git rm -rf 20**
git rm -rf 19**
git commit -am "cleanup"
git push origin master --force

