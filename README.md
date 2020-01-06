# Chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :comments
- has_many :user_groups
- has_many :groups, through:  :user_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :comments
- has_many :user_groups
- has_many :users, through:  :user_groups

## user_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|comment|string||
|image|string||
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
- validates :text,presence: true, unless: 'image.present?'