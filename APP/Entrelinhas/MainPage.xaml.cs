using Microsoft.Maui.Controls;

namespace MyApp
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private void OnSubmitClicked(object sender, EventArgs e)
        {
            DisplayAlert("Ação", "Botão Submit clicado!", "OK");
        }
    }
}
