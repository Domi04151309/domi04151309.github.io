#!/bin/sh
whiptail --title "MacBuntu" --msgbox "MacBuntu from noobslab.com\nScript by Domi04151309\nhttps://domi04151309.github.io/\n\nThis script installs the MacBuntu themes.\nIf you are not sure whether you want to install or not try it in a virtual machine." 14 78
clear

echo "Adding the repositories..."
sudo add-apt-repository -y ppa:noobslab/macbuntu
clear

echo "Updating the repositories..."
sudo apt-get update
clear

echo "Installing..."

echo "Programs..."
sudo apt-get -y install macbuntu-os-icons-v1804 macbuntu-os-ithemes-v1804 slingscold albert plank macbuntu-os-plank-theme-v1804 libreoffice-style-sifr gnome-shell-extensions dconf-cli git

echo "Cloning..."
git clone https://github.com/Domi04151309/MacBuntu-Extras
sudo mkdir /MacBuntu

echo "Getting wallpapers..."
sudo cp MacBuntu-Extras/macos/10-14-Day.jpg /MacBuntu
cp -R ./MacBuntu-Extras/macos ./

echo "Getting fonts..."
wget -O mac-fonts.zip http://drive.noobslab.com/data/Mac/macfonts.zip
sudo unzip mac-fonts.zip -d /usr/share/fonts
rm mac-fonts.zip
sudo fc-cache -f -v

echo "Applying themes..."
gsettings set org.gnome.desktop.interface gtk-theme 'MacBuntu-OS-MJV'
gsettings set org.gnome.desktop.interface cursor-theme 'mac-cursors'
gsettings set org.gnome.desktop.interface icon-theme 'MacBuntu-OS'
gsettings set org.gnome.shell.extensions.user-theme name 'MacBuntu-OS-3.2'
gsettings set org.gnome.shell.extensions.dash-to-dock dock-fixed false
gsettings set org.gnome.desktop.wm.preferences button-layout 'close,minimize,maximize:'
gsettings set org.gnome.desktop.wm.preferences titlebar-font 'Lucida Grande 11'
gsettings set org.gnome.desktop.interface font-name 'Lucida Grande 11'
gsettings set org.gnome.desktop.interface document-font-name 'Lucida Grande 11'
gsettings set org.gnome.desktop.background picture-uri file:///MacBuntu/10-14-Day.jpg

echo "Configuring Plank..."
rm -rf ~/.config/plank
cp -R ./MacBuntu-Extras/plank ~/.config
cat ./MacBuntu-Extras/docks.ini | dconf load /net/launchpad/plank/docks/
mkdir ~/.config/autostart
cp MacBuntu-Extras/plank.desktop ~/.config/autostart/plank.desktop
nohup plank &
sleep 2
rm nohup.out
clear

echo "Asking the user..."
if (whiptail --title "MacBuntu" --yesno "Do you want to install Gnome Tweak Tool?" 8 78) then
    sudo apt-get -y install gnome-tweak-tool
else
    echo "User selected No, exit status was $?."
fi
clear

echo "Finishing..."
rm -rf MacBuntu-Extras
whiptail --title "MacBuntu" --msgbox "Adding repositories... Done\nUpdating repositories... Done\nInstalling... Done" 10 78
clear
