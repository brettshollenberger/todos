module Api
  module V1
    class TodosController < ApplicationController
      skip_before_filter :verify_authenticity_token
      respond_to :json

      def index
        respond_with(Todo.all.order("completed ASC").order("id DESC"))
      end

      def show
        respond_with(Todo.find(params[:id]))
      end

      def create
        @todo = Todo.new(todo_params)
        if @todo.save
          respond_to do |format|
            format.json { render :json => @todo }
          end
        end
      end

      def update
        @todo = Todo.find(params[:id])
        if @todo.update(todo_params)
          respond_to do |format|
            format.json { render :json => @todo }
          end
        end
      end

      def destroy
        respond_with Todo.destroy(params[:id])
      end

    private
      def todo_params
        params.require(:todo).permit(:title, :completed)
      end
    end
  end
end
