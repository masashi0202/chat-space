class MessagesController < ApplicationController
  before_action :set_group

  def index
    # 投稿時に作成される新しいインスタンス
    @message = Message.new
    # 現在のグループのすベてのメッセージを格納するインスタンス
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    # 投稿が成功した場合の条件分岐
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      # groupインスタンスの持つidと同じ値のgroup_idを持つmessageテーブルのレコードの一覧を格納したインスタンスを作成。ユーザ情報も格納するためincludeを使用している
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    # 全てのアクションで@groupを使用できるようにする
    @group = Group.find(params[:group_id])
  end
end