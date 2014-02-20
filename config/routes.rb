TodoMvc::Application.routes.draw do

  root "application#index"

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      controller :todos do
        resources :todos
      end
    end
  end
end
