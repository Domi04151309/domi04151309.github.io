#!/bin/bash
whiptail --title "Windows Theme" --msgbox "Windows themes from noobslab.com\nScript by Domi04151309\nhttps://domi04151309.github.io/\n\nThis script installs the Windows 10 themes.\nIf you are not sure whether you want to install or not try it in a virtual machine." 14 78
clear

echo "Adding the repositories..."
sudo add-apt-repository ppa:noobslab/themes -y
clear

echo "Updating the repositories..."
sudo apt-get update
clear

echo "Installing..."
sudo mkdir /WindowsTheme
#Programs
sudo apt-get --yes --force-yes install windos-10-themes git

#Menu
git clone https://github.com/Domi04151309/WindowsTheme-Extras
cd WindowsTheme-Extras
sudo cp launcher_cinnamon.png /WindowsTheme
sudo cp img0.jpg /WindowsTheme
cp 1.json ~/.cinnamon/configs/menu@cinnamon.org
cd ../
rm -rf WindowsTheme-Extras
clear

#Asks user and applies themes
gsettings set org.gnome.desktop.background picture-uri file:///WindowsTheme/img0.jpg
gsettings set org.cinnamon.desktop.background picture-uri  file:///WindowsTheme/img0.jpg

tweaks=$(whiptail --title "Windows Themes" --menu "Choose an option" 14 78 4 \
"1" "Windows 10 light look" \
"2" "Windows 10 dark look" \
"3" "Skip this step" 3>&1 1>&2 2>&3)
case "$tweaks" in
1)
gsettings set org.gnome.desktop.interface gtk-theme 'Windos-10-Light'
gsettings set org.gnome.desktop.wm.preferences theme 'Windos-10-Light'
gsettings set org.cinnamon.desktop.interface gtk-theme 'Windos-10-Light'
gsettings set org.cinnamon.desktop.wm.preferences theme 'Windos-10-Light'
gsettings set org.cinnamon.theme name 'Windos-10-Light'
;;
2)
gsettings set org.gnome.desktop.interface gtk-theme 'Windos-10-Dark'
gsettings set org.gnome.desktop.wm.preferences theme 'Windos-10-Dark'
gsettings set org.cinnamon.desktop.interface gtk-theme 'Windos-10-Dark'
gsettings set org.cinnamon.desktop.wm.preferences theme 'Windos-10-Dark'
gsettings set org.cinnamon.theme name 'Windos-10-Dark'
;;
3) echo "Skipping this step"
;;
	*) echo "Cancelling"
;;
esac
clear

cd /usr/share/icons
sudo wget -O temp.zip https://github.com/Elbullazul/Windows-10/releases/download/v0.9.6/Windows.10.Icons.v0.4.1.zip
sudo unzip -o temp.zip
sudo rm -Rf temp.zip
gsettings set org.gnome.desktop.interface icon-theme 'Windows 10 Icons'
gsettings set org.cinnamon.desktop.interface icon-theme 'Windows 10 Icons'

cd ~

whiptail --title "Windows Theme" --msgbox "Adding repositories... Done\nUpdating repositories... Done\nInstalling... Done" 10 78
clear




