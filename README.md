# Chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :posts
- has_many :users_chatgroups
- has_many :chatgroups, through:  :users_chatgroups

## chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
|member|string||
### Association
- has_many :posts
- has_many :users_chatgroups
- has_many :users, through:  :users_chatgroups

## users_chatgroupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|chatgroup_id|integer|null: false, foreign_key: true|
### Association
belongs_to :user
belongs_to :chatgroup

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|string|null: false|
|image|string||
|user_id|integer|null: false, foreign_key: true|
|chatgroup_id|integer|null: false, foreign_key: true|
### Association
belongs_to :user
belongs_to :chatgroup