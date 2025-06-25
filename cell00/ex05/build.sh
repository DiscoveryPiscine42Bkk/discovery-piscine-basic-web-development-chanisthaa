if [ $# -eq 0 ]; then
  echo "No folder names provided."
  exit 1
fi
for folder in "$@"; do
  new_folder="ex${folder}"
  if mkdir "$new_folder" 2>/dev/null; then
    echo "Folder '$new_folder' created successfully."
  else
    echo "Error creating folder '$new_folder'."
  fi
done
echo "Finished processing folder names."