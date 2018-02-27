#!/bin/bash
whiptail --title "MacBuntu" --msgbox "MacBuntu from noobslab.com\nScript by Domi04151309\nhttps://domi04151309.github.io/\n\nThis script installs the MacBuntu themes.\nIf you are not sure whether you want to install or not try it in a virtual machine." 14 78
clear

echo "Adding the repositories..."
sudo add-apt-repository ppa:noobslab/macbuntu -y
clear

echo "Updating the repositories..."
sudo apt-get update
clear

echo "Installing..."
#Wallpapers
sudo mkdir /MacBuntu
wget -O temp.zip http://drive.noobslab.com/data/Mac/MacBuntu-Wallpapers.zip
unzip -o temp.zip
rm temp.zip
sudo cp MacBuntu-Wallpapers/mbuntu-4.jpg /MacBuntu

#Programs
sudo apt-get --yes --force-yes install macbuntu-os-icons-lts-v7 macbuntu-os-ithemes-lts-v7 slingscold albert plank macbuntu-os-plank-theme-lts-v7 libreoffice-style-sifr dconf-cli git

#Menu
cd && wget -O Mac.po http://drive.noobslab.com/data/Mac/change-name-on-panel/mac.po
cd /usr/share/locale/en/LC_MESSAGES; sudo msgfmt -o unity.mo ~/Mac.po;rm ~/Mac.po;cd
wget -O launcher_bfb.png http://drive.noobslab.com/data/Mac/launcher-logo/apple/launcher_bfb.png
sudo mv launcher_bfb.png /usr/share/unity/icons/

git clone https://github.com/Domi04151309/MacBuntu-Extras
cd MacBuntu-Extras
sudo cp launcher_cinnamon.png /MacBuntu
cp 1.json ~/.cinnamon/configs/menu@cinnamon.org
cp 3.json ~/.cinnamon/configs/panel-launchers@cinnamon.org
cd ../
rm -rf MacBuntu-Extras
clear

#Applies themes
gsettings set org.gnome.desktop.interface icon-theme 'MacBuntu-OS'
gsettings set org.gnome.desktop.interface gtk-theme 'MacBuntu-OS'
gsettings set org.gnome.desktop.wm.preferences theme 'MacBuntu-OS'
gsettings set org.cinnamon.desktop.interface icon-theme 'MacBuntu-OS'
gsettings set org.cinnamon.desktop.interface gtk-theme 'MacBuntu-OS'
gsettings set org.cinnamon.desktop.wm.preferences theme 'MacBuntu-OS'
gsettings set org.cinnamon.theme name 'MacBuntu-OS'
gsettings set org.gnome.desktop.background picture-uri file:///MacBuntu/mbuntu-4.jpg
gsettings set org.cinnamon.desktop.background picture-uri  file:///MacBuntu/mbuntu-4.jpg

#Configurates Plank
nohup plank &
sleep 2
dconf dump /net/launchpad/plank/docks/ > docks.ini
sed -Ei 's/Default/MB-OSXYosemite/g' docks.ini
sed -Ei 's/zoom-enabled=false/zoom-enabled=true/g' docks.ini
cat docks.ini | dconf load /net/launchpad/plank/docks/
rm docks.ini
cat > plank.sh <<- "EOF"
#!/bin/bash
plank &
EOF
chmod +x plank.sh
sudo mv plank.sh /etc/profile.d/
rm nohup.out
clear

if (whiptail --title "MacBuntu" --yesno "Do you want to install the boot screen?" 8 78) then
    sudo apt-get --yes --force-yes install macbuntu-os-bscreen-lts-v7
else
    echo "User selected No, exit status was $?."
fi
clear

if (whiptail --title "MacBuntu" --yesno "Do you want to install the lock screen?" 8 78) then
    sudo apt-get --yes --force-yes install macbuntu-os-lightdm-lts-v7
else
    echo "User selected No, exit status was $?."
fi
clear

tweaks=$(whiptail --title "MacBuntu" --menu "Choose an option" 14 78 4 \
"1" "Unity tweak Tool (Ubuntu, Unity)" \
"2" "Gnome Tweak Tool (Ubuntu, Gnome)" \
"3" "Skip this step" 3>&1 1>&2 2>&3)
case "$tweaks" in
1) sudo apt-get --yes --force-yes install unity-tweak-tool
;;
2) sudo apt-get --yes --force-yes install gnome-tweak-tool
;;
3) echo "Skipping this step"
;;
	*) echo "Cancelling"
;;
esac
clear

whiptail --title "MacBuntu" --msgbox "Adding repositories... Done\nUpdating repositories... Done\nInstalling... Done" 10 78
clear




