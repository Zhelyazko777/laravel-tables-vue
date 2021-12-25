export default {
  filters: {
    replaceLinkId (link, row) {
        const regex = `${encodeURI('[')}.+\\${encodeURI(']')}`;
        const match = link.match(RegExp(regex));
        if (match && match.length > 0) {
          const itemsToReplace = match[0].split('/');
          for (const item of itemsToReplace) {
              const trimmedItem = item.replace(encodeURI('['), '').replace(encodeURI(']'), '');
              if (trimmedItem === 'itemId') {
                  link = link.replace(encodeURI('[itemId]'), row.id);
              } else {
                  link = link.replace(encodeURI(`[${trimmedItem}]`), row[trimmedItem]);
              }
          }
        }

        return link;
    },
},
}